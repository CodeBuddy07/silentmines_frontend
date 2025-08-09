"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FormField {
    name: string;
    placeholder: string;
    value: string;
    onChange: (val: string) => void;
}

interface TypesModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    title: string;
    fields: FormField[];
    onSave: () => void;
}

const TypesModal: React.FC<TypesModalProps> = ({ open, setOpen, title, fields, onSave }) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-black border border-black">
                <DialogHeader>
                    <DialogTitle className="text-white">{title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-3">
                    {fields.map((field, i) => (
                        <Input
                            key={i}
                            className="text-white"
                            placeholder={field.placeholder}
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                        />
                    ))}
                </div>
                <DialogFooter className="flex justify-end gap-2">
                    <Button
                        variant="outline"
                        className="border-gray-500 bg-red-500 text-white hover:bg-red-400 hover:text-white cursor-pointer"
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button onClick={onSave} className="bg-[#00A63E] hover:bg-green-400 cursor-pointer">
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default TypesModal;
