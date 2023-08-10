import { useState } from 'react';

function InstallHookInstructions() {
    const [showModal, setShowModal] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopyClick = () => {
        const command = 'bash <(curl -s https://raw.githubusercontent.com/jasonjche/gitReal/main/install_hook.sh)';
        navigator.clipboard.writeText(command);
        setCopied(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setCopied(false);
    }

    return (
        <div>
            <button onClick={() => setShowModal(true)} className="text-white font-bold bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded">
                Install
            </button>
            {showModal && (
                <div className="fixed z-10 inset-0 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black opacity-75"></div>
                    <div className="bg-neutral-800 text-white shadow-xl transform transition-all" style={{ maxWidth: '80vw' }}>
                        <div className="bg-neutral-900 text-white p-6">
                            <h3 className="text-lg leading-6 font-medium text-white">Install Git Hook</h3>
                            <p className="mt-2 text-sm text-neutral-300">
                                To install the Git hook, please copy and paste the following command into your project terminal <strong>(make sure to have Homebrew installed)</strong>
                            </p>
                            <div className="mt-2 bg-neutral-700 rounded p-2 text-sm font-mono text-white whitespace-nowrap">
                                bash &lt;(curl -s https://raw.githubusercontent.com/jasonjche/gitReal/main/install_hook.sh)
                            </div>
                            <div className="mt-4 flex flex-row justify-between">
                                <button onClick={handleCopyClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    {copied ? 'Copied!' : 'Copy to Clipboard'}
                                </button>
                                <button onClick={handleModalClose} type="button" className="bg-neutral-800 font-bold text-white rounded-md shadow-sm py-2 px-4 hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default InstallHookInstructions;
