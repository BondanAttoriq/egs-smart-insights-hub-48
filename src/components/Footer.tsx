
import { MapPin, Mail, Phone, Globe } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-orange-100 px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">EG</span>
            </div>
            <span className="font-bold text-gray-900">EGSmart 1.0</span>
          </div>
          <p className="text-gray-600 text-sm">
            The leading machine learning platform for optimizing Enhanced Geothermal Systems drilling
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Kontak</h4>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-orange-500" />
              <span>Institut Teknologi Bandung</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-orange-500" />
              <span>egsmart@itb.ac.id</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-orange-500" />
              <span>+62 22 2500935</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Fitur</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Real-Time Monitoring</li>
            <li>Cloud Dataset</li>
            <li>Professional Analysis</li>
            <li>ML Predictions</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Referensi</h4>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-orange-500" />
              <span>ITB Research Portal</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-orange-500" />
              <span>Geothermal Energy Journal</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-orange-500" />
              <span>Machine Learning Research</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-orange-100 mt-8 pt-6 text-center">
        <p className="text-sm text-gray-600">
          © 2024 EGSmart 1.0 - Institut Teknologi Bandung. Enhanced Geothermal Drilling Optimization powered by Multi-Model Machine Learning.
        </p>
      </div>
    </footer>
  );
};
