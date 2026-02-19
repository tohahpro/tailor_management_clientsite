import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../ui/alert-dialog";
import SubmitButton from "./SubmitButton";

interface DeleteConfirmDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
    itemName?: string;
    isDeleting?: boolean;
}

const DeleteConfirmationDialog = ({
    open,
    onOpenChange,
    onConfirm,
    title,
    description,
    itemName,
    isDeleting,
}: DeleteConfirmDialogProps) => {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description || (
                            <>
                                This will delete <strong>{itemName}</strong>. This action cannot
                                be undone.
                            </>
                        )}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isDeleting} className="cursor-pointer">Cancel</AlertDialogCancel>
                    <SubmitButton
                        onClick={onConfirm}
                        isLoading={isDeleting}
                        loadingText="Deleting..."
                        className="w-1/5 h-8.5 text-white text-sm font-medium rounded-md hover:cursor-pointer"
                        title="Delete"
                    />
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteConfirmationDialog;