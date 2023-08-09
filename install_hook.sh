#!/bin/bash

# Check if the current directory is a Git repository
if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
    echo "Error: You must run this script inside a Git repository."
    exit 1
fi

# Define the content of the post-commit hook
read -r -d '' hook_content << 'EOM'
#!/bin/bash

# Function to perform countdown
function countdown {
    local count=$1
    while [ $count -gt 0 ]; do
        echo "Countdown: $count"
        sleep 1
        ((count--))
    done
}

if ! command -v brew &> /dev/null; then
    echo "Error: Homebrew is not installed!"
    echo "Please install Homebrew from https://brew.sh/ and try again."
    exit 1
fi

# Check if imagesnap and screencapture tools are installed
if ! command -v imagesnap &> /dev/null || ! command -v screencapture &> /dev/null; then
    echo "Error: imagesnap and/or screencapture tools are not installed!"
    echo "Installing imagesnap..."
    brew install imagesnap
    echo "Installing screencapture..."
    brew install coreutils
    exit 1
fi

# Check if the base64 command is available
if ! command -v base64 &> /dev/null; then
    echo "Error: base64 command not found!"
    echo "Installing base64..."
    brew install base64
    exit 1
fi

# Get timestamp, commit message, and author
timestamp=$(date +%s)
commit_message=$(git log --format=%s -1)
author=$(git log --format=%an -1)

# Perform countdown
duration=3
countdown $duration

# Create timestamp directory and capture images
mkdir "$timestamp"
cd "$timestamp"
imagesnap "pic.jpg"
screencapture "ss.jpg"
cd ..

# Check if the image files exist
picture_file="${timestamp}/pic.jpg"
screenshot_file="${timestamp}/ss.jpg"
if [ ! -f "$picture_file" ] || [ ! -f "$screenshot_file" ]; then
    echo "Error: Failed to capture image files!"
    exit 1
fi

# API endpoint URL
api_url='https://9daohzt5ol.execute-api.us-east-2.amazonaws.com/test/uploadGitRealImages'

# Encode picture and screenshot data as base64 strings
picture_base64=$(base64 < "$picture_file")
screenshot_base64=$(base64 < "$screenshot_file")

# Prepare the payload data for the API
payload='{
  "timestamp": "'"$timestamp"'",
  "commit_message": "'"$commit_message"'",
  "author": "'"$author"'",
  "picture_data": "'"$picture_base64"'",
  "screenshot_data": "'"$screenshot_base64"'"
}'

# Save the payload to a temporary file
payload_file=$(mktemp)
echo "$payload" > "$payload_file"

# Send the POST request to the API endpoint using curl with --data-binary
response=$(curl -s -X POST -H "Content-Type: application/json" --data-binary "@$payload_file" "$api_url")

# Print the response
echo "$response"

# Remove the temporary payload file and the timestamp directory
rm -f "$payload_file"
rm -rf "$timestamp"
EOM

# Determine the path to the post-commit hook
hook_path="$(git rev-parse --show-toplevel)/.git/hooks/post-commit"

# Create the hooks directory if it doesn't exist
mkdir -p "$(dirname "$hook_path")"

# Write the hook content to the post-commit file
echo "$hook_content" > "$hook_path"

# Make the post-commit hook executable
chmod +x "$hook_path"

echo "The post-commit hook has been successfully installed."
