"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import React from "react";

interface FormField {
    name: string;
    placeholder: string;
    type?: "text" | "textarea";
    value: string;
    onChange: (value: string) => void;
}

interface CategoryModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    title: string;
    fields: FormField[];
    onSave: () => void;
}

const CategoryModel: React.FC<CategoryModalProps> = ({
    open,
    setOpen,
    title,
    fields,
    onSave,
}) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-black border border-black">
                <DialogHeader>
                    <DialogTitle className="text-white">{title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-3">
                    {fields.map((field, idx) =>
                        field.type === "textarea" ? (
                            <Textarea
                                key={idx}
                                className="text-white"
                                placeholder={field.placeholder}
                                value={field.value}
                                onChange={(e) => field.onChange(e.target.value)}
                            />
                        ) : (
                            <Input
                                key={idx}
                                className="text-white"
                                placeholder={field.placeholder}
                                value={field.value}
                                onChange={(e) => field.onChange(e.target.value)}
                            />
                        )
                    )}
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

export default CategoryModel;
