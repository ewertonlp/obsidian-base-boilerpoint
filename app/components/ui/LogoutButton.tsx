import { LogOut } from "lucide-react";
import { Button } from "@/app/components/ui/Button";
import { signOutAction } from "@/app/actions/auth"; // Verifique se o caminho bate com o seu

export function LogoutButton() {
  return (
    <form action={signOutAction} className="w-full">
      <Button 
        type="submit"
        variant="danger" 
        size="sm" 
        className="text-text-secondary rounded-br-2xl rounded-tr-2xl hover:text-red-400 w-full justify-start"
      >
        <LogOut className="mr-2 h-4 w-4" />
        Log out
      </Button>
    </form>
  );
}