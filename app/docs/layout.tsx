import { Header } from "@/app/components/layout/Header";
import { Footer } from "@/app/components/layout/Footer";
import { DocsSidebar } from "./DocsSideBar"; 

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-obsidian-bg">
      <Header />
      <div className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 md:py-16 flex flex-col md:flex-row gap-8 md:gap-12">
        
        <DocsSidebar />    

        <main className="flex-1 w-full max-w-3xl pb-16">
          <article className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {children}
          </article>
        </main>
      </div>

      <Footer />
    </div>
  );
}