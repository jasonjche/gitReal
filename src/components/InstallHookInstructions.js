import { useState } from 'react';

function InstallHookInstructions() {
    const [showModal, setShowModal] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopyClick = () => {
        const command = 'bash <(curl -s https://raw.githubusercontent.com/jasonjche/gitReal/main/install_hook.sh)';
        navigator.clipboard.writeText(command);
        setCopied(true);
    };

    return (
        <div>
            <button onClick={() => setShowModal(true)} className="text-white font-bold bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded">
                Install
            </button>
            {showModal && (
                <div className="fixed z-10 inset-0">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-black opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-neutral-800 rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-neutral-900 text-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div>
                                        <h3 className="text-lg leading-6 font-medium text-white">Install Git Hook</h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-neutral-300">
                                                To install the Git hook, please copy and paste the following command into your terminal:
                                            </p>
                                            <div className="mt-2 bg-neutral-700 rounded p-2 text-sm font-mono text-white">
                                                bash &lt;(curl -s https://raw.githubusercontent.com/jasonjche/gitReal/main/install_hook.sh)
                                            </div>
                                            <div className=''>
                                                <button onClick={handleCopyClick} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                    {copied ? 'Copied!' : 'Copy to Clipboard'}
                                                </button>
                                                <button onClick={() => setShowModal(false)} type="button" className="bg-neutral-800 text-white border border-neutral-600 rounded-md shadow-sm py-2 px-4 text-sm font-medium hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                                    Close
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default InstallHookInstructions;
