import { Button } from "@/components/ui/button";
import { useRemoveMutation } from "@/lib/api/semesterApi/removeApi";
import { Trash2Icon } from "lucide-react";
const TableActionMenu: React.FC<{ id: string }> = ({ id }) => {
  const { mutateAsync: remove } = useRemoveMutation();
  return (
    <div>
      <Button
        onClick={() => {
          remove(id);
        }}
        variant={"destructive"}
        size={"sm"}
      >
        <Trash2Icon size={14} className="" />
      </Button>
    </div>
  );
};

export default TableActionMenu;
