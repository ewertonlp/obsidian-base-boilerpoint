import { LogOut } from "lucide-react";
import { Button } from "@/app/components/ui/Button";
import { signOutAction } from "@/app/actions/auth"; // Verifique se o caminho bate com o seu

export function LogoutButton() {
  return (
    <form action={signOutAction} className="w-full">
      <Button 
        type="submit"
        variant="ghost" 
        size="sm" 
        className="text-text-secondary hover:text-red-500 hover:bg-red-500/10 w-full justify-start"
      >
        <LogOut className="mr-2 h-4 w-4" />
        Log out
      </Button>
    </form>
  );
}