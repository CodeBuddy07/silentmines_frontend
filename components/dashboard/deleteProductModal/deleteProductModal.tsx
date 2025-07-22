import React from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteProductModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    productName?: string;
}

const DeleteProductModal: React.FC<DeleteProductModalProps> = ({
    open,
    onClose,
    onConfirm,
    productName,
}) => {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md bg-black text-white border border-black">
                <DialogHeader>
                    <DialogTitle>Are you sure you want to delete?</DialogTitle>
                </DialogHeader>
                <div className="text-sm text-muted-foreground">
                    This will permanently remove <strong>{productName}</strong>.
                </div>
                <DialogFooter className="mt-4">
                    <Button variant="default" className="bg-white text-black hover:bg-opacity-10 hover:text-black" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={onConfirm}>
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteProductModal;
