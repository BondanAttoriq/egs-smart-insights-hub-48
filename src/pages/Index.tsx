
import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { AlgorithmComparison } from '@/components/AlgorithmComparison';
import { Footer } from '@/components/Footer';
import { RealTimeMonitor } from '@/components/RealTimeMonitor';
import { CloudDataset } from '@/components/CloudDataset';
import { ProfessionalAnalysis } from '@/components/ProfessionalAnalysis';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  const renderContent = () => {
    switch (activeSection) {
      case 'monitor':
        return <RealTimeMonitor />;
      case 'dataset':
        return <CloudDataset />;
      case 'analysis':
        return <ProfessionalAnalysis />;
      default:
        return (
          <div className="space-y-16">
            <HeroSection />
            <AlgorithmComparison />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50 flex w-full">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-8">
          {renderContent()}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
