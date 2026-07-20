import { Camera, Mail, User, Save } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";

export default function ProfilePage() {
  return (
    <div className="p-8 max-w-4xl mx-auto w-full">
      
      {/* Cabeçalho da Página */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-text-primary">
          Profile Settings
        </h1>
        <p className="text-text-secondary mt-1">
          Manage your account details and public profile.
        </p>
      </div>

      <div className="space-y-6">
        
        {/* Seção 1: Foto de Perfil */}
        <div className="glass-panel rounded-2xl p-6 border border-obsidian-border">
          <h2 className="text-lg font-medium text-text-primary mb-4">Profile Picture</h2>
          
          <div className="flex items-center gap-6">
            {/* Avatar com efeito de hover para upload */}
            <div className="relative h-24 w-24 rounded-full bg-obsidian-surface border border-obsidian-border/50 flex items-center justify-center group overflow-hidden">
              <User className="h-10 w-10 text-text-secondary" />
              
              {/* Máscara escura que aparece ao passar o mouse */}
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Camera className="h-6 w-6 text-white" />
              </div>
            </div>
            
            {/* Ações da Foto */}
            <div>
              <div className="flex gap-3">
                <Button variant="secondary" size="sm">
                  Upload new
                </Button>
                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-500/80 hover:bg-red-500/10">
                  Remove
                </Button>
              </div>
              <p className="text-xs text-text-secondary mt-3">
                Recommended size: 256x256px. Maximum size: 2MB.
              </p>
            </div>
          </div>
        </div>

        {/* Seção 2: Informações Pessoais */}
        <div className="glass-panel rounded-2xl p-6 border border-obsidian-border">
          <h2 className="text-lg font-medium text-text-primary mb-4">Personal Information</h2>
          
          <form className="space-y-5">
            {/* Grid para dividir Nome e Sobrenome lado a lado em telas maiores */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input 
                label="First Name" 
                type="text" 
                defaultValue="John" 
                icon={<User className="h-4 w-4" />} 
              />
              <Input 
                label="Last Name" 
                type="text" 
                defaultValue="Doe" 
                icon={<User className="h-4 w-4" />} 
              />
            </div>

            {/* O campo de E-mail geralmente fica desabilitado pois a troca exige confirmação de segurança (OTP) */}
            <Input 
              label="Email Address" 
              type="email" 
              defaultValue="you@example.com" 
              icon={<Mail className="h-4 w-4" />} 
              disabled 
            />

            {/* Rodapé do Formulário com Botão de Salvar */}
            <div className="pt-4 mt-6 border-t border-obsidian-border/50 flex justify-end">
              <Button variant="primary">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}