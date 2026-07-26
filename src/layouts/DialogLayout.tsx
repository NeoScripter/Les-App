import cn from '@/utils/cn';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import type { ComponentChild } from 'preact';

type DialogLayoutProps = {
    children: ComponentChild;
    show: boolean;
    onClose: () => void;
    className?: string;
};

export default function DialogLayout({
    show,
    children,
    onClose,
    className,
}: DialogLayoutProps) {
    return (
        <Dialog
            open={show}
            onClose={onClose}
            className={cn(
                'fixed inset-0 z-50 flex items-center justify-center overflow-y-auto text-white outline-none',
                className,
            )}
        >
            <DialogBackdrop
                transition
                className="fixed inset-0 backdrop-blur-sm duration-300 ease-in-out data-closed:opacity-0"
            />

            <DialogPanel
                transition
                className={cn(
                    'relative z-50 duration-300 ease-in-out data-closed:scale-40 data-closed:opacity-0',
                )}
            >
                {children}
            </DialogPanel>
        </Dialog>
    );
}
