import React, { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import { Download, Image as ImageIcon, Type, Palette, Heart } from 'lucide-react';
import ColorPicker from './components/ColorPicker';
import FontSelector from './components/FontSelector';
import TextEditor from './components/TextEditor';
import ImageUploader from './components/ImageUploader';

const fonts = [
  { name: 'Dancing Script', value: 'Dancing Script' },
  { name: 'Playfair Display', value: 'Playfair Display' },
  { name: 'Montserrat', value: 'Montserrat' },
  { name: 'Great Vibes', value: 'Great Vibes' },
  { name: 'Lato', value: 'Lato' },
  { name: 'Roboto', value: 'Roboto' },
  { name: 'Open Sans', value: 'Open Sans' },
  { name: 'Parisienne', value: 'Parisienne' },
];

const colors = [
  '#F9A8D4', // Pink
  '#FDA4AF', // Rose
  '#FCD34D', // Amber
  '#A7F3D0', // Emerald
  '#93C5FD', // Blue
  '#C4B5FD', // Violet
  '#ffffff', // White
  '#000000', // Black
];

function App() {
  const [activeTab, setActiveTab] = useState<'text' | 'color' | 'image'>('text');
  const [inviteData, setInviteData] = useState({
    names: 'Sarah & Michael',
    date: 'June 15, 2025',
    venue: 'Sunset Beach Resort, Hawaii',
    message: 'Request the pleasure of your company as they join in marriage',
  });
  const [selectedFont, setSelectedFont] = useState('Dancing Script');
  const [selectedColor, setSelectedColor] = useState('#F9A8D4');
  const [backgroundImage, setBackgroundImage] = useState('https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070');
  const inviteRef = useRef<HTMLDivElement>(null);

  const handleTextChange = (field: keyof typeof inviteData, value: string) => {
    setInviteData(prev => ({ ...prev, [field]: value }));
  };

  const handleFontChange = (font: string) => {
    setSelectedFont(font);
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const handleImageUpload = (imageUrl: string) => {
    setBackgroundImage(imageUrl);
  };

  const downloadInvite = () => {
    if (inviteRef.current) {
      toPng(inviteRef.current, { 
        cacheBust: true,
        skipFonts: true // Skip trying to inline fonts which causes CORS issues
      })
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = 'wedding-invitation.png';
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.error('Error downloading invitation:', err);
        });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="text-pink-400" size={24} />
            <h1 className="text-2xl font-semibold text-gray-800">Wedding Invite Designer</h1>
          </div>
          <button 
            onClick={downloadInvite}
            className="flex items-center space-x-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            <Download size={18} />
            <span>Download Invitation</span>
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Editor Panel */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
            <div className="mb-6">
              <div className="flex border-b border-gray-200">
                <button
                  className={`px-4 py-2 font-medium ${activeTab === 'text' ? 'text-pink-500 border-b-2 border-pink-500' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('text')}
                >
                  <div className="flex items-center space-x-2">
                    <Type size={18} />
                    <span>Text</span>
                  </div>
                </button>
                <button
                  className={`px-4 py-2 font-medium ${activeTab === 'color' ? 'text-pink-500 border-b-2 border-pink-500' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('color')}
                >
                  <div className="flex items-center space-x-2">
                    <Palette size={18} />
                    <span>Colors</span>
                  </div>
                </button>
                <button
                  className={`px-4 py-2 font-medium ${activeTab === 'image' ? 'text-pink-500 border-b-2 border-pink-500' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('image')}
                >
                  <div className="flex items-center space-x-2">
                    <ImageIcon size={18} />
                    <span>Background</span>
                  </div>
                </button>
              </div>
            </div>

            <div className="mt-4">
              {activeTab === 'text' && (
                <div>
                  <TextEditor 
                    inviteData={inviteData} 
                    onTextChange={handleTextChange} 
                  />
                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Font Style</h3>
                    <FontSelector 
                      fonts={fonts} 
                      selectedFont={selectedFont} 
                      onFontChange={handleFontChange} 
                    />
                  </div>
                </div>
              )}

              {activeTab === 'color' && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Text Color</h3>
                  <ColorPicker 
                    colors={colors} 
                    selectedColor={selectedColor} 
                    onColorChange={handleColorChange} 
                  />
                </div>
              )}

              {activeTab === 'image' && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Background Image</h3>
                  <ImageUploader onImageUpload={handleImageUpload} />
                  
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Sample Backgrounds</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070',
                        'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069',
                        'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=1974',
                        'https://images.unsplash.com/photo-1509927083803-4bd519298ac4?q=80&w=2070'
                      ].map((img, index) => (
                        <div 
                          key={index}
                          className={`h-20 rounded-md overflow-hidden cursor-pointer border-2 ${backgroundImage === img ? 'border-pink-500' : 'border-transparent'}`}
                          onClick={() => setBackgroundImage(img)}
                        >
                          <img src={img} alt={`Sample background ${index + 1}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Invitation Preview</h2>
              <div className="flex justify-center">
                <div 
                  ref={inviteRef}
                  className="w-full max-w-2xl aspect-[3/4] rounded-lg overflow-hidden shadow-lg relative"
                  style={{ 
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                    <div 
                      className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-md"
                      style={{ fontFamily: selectedFont }}
                    >
                      <p className="text-sm uppercase tracking-widest mb-2" style={{ color: selectedColor }}>WEDDING INVITATION</p>
                      <h1 className="text-4xl font-bold mb-4" style={{ color: selectedColor }}>{inviteData.names}</h1>
                      <p className="mb-6" style={{ color: selectedColor }}>{inviteData.message}</p>
                      <div className="w-16 h-0.5 mx-auto mb-6" style={{ backgroundColor: selectedColor }}></div>
                      <p className="text-xl mb-2" style={{ color: selectedColor }}>{inviteData.date}</p>
                      <p className="text-lg" style={{ color: selectedColor }}>{inviteData.venue}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;