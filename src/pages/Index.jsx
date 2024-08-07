import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Paw, Info, Award, Image as ImageIcon, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const catBreeds = [
  { name: "Siamese", image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Siam_lilacpoint.jpg", description: "Known for their distinctive color points and blue almond-shaped eyes." },
  { name: "Persian", image: "https://upload.wikimedia.org/wikipedia/commons/1/15/White_Persian_Cat.jpg", description: "Characterized by their long, fluffy coat and round face." },
  { name: "Maine Coon", image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Maine_Coon_cat_by_Tomitheos.JPG", description: "One of the largest domesticated cat breeds, known for their intelligence and playful personality." },
  { name: "Bengal", image: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Paintedcats_Red_Star_standing.jpg", description: "Developed to look like exotic jungle cats such as leopards and ocelots." },
  { name: "Scottish Fold", image: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Adult_Scottish_Fold.jpg", description: "Characterized by a gene mutation that affects cartilage throughout the body, giving the ears a folded appearance." },
];

const Index = () => {
  const [quizScore, setQuizScore] = useState(0);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [likedBreeds, setLikedBreeds] = useState({});
  const [currentBreedIndex, setCurrentBreedIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBreedIndex((prevIndex) => (prevIndex + 1) % catBreeds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const toggleLike = (breedName) => {
    setLikedBreeds((prev) => ({ ...prev, [breedName]: !prev[breedName] }));
  };

  const handleQuizSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const answers = Object.fromEntries(formData);
    let score = 0;
    if (answers.q1 === "clowder") score++;
    if (answers.q2 === "30") score++;
    if (answers.q3 === "70") score++;
    setQuizScore(score);
    setShowQuizResult(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100">
      <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
        <ul className="flex justify-center space-x-6">
          <li><a href="#hero" className="text-blue-600 hover:text-blue-800 transition-colors">Home</a></li>
          <li><a href="#facts" className="text-blue-600 hover:text-blue-800 transition-colors">Facts</a></li>
          <li><a href="#breeds" className="text-blue-600 hover:text-blue-800 transition-colors">Breeds</a></li>
          <li><a href="#gallery" className="text-blue-600 hover:text-blue-800 transition-colors">Gallery</a></li>
          <li><a href="#quiz" className="text-blue-600 hover:text-blue-800 transition-colors">Quiz</a></li>
        </ul>
      </nav>

      <section id="hero" className="relative h-[600px] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <AnimatePresence>
          <motion.img 
            key={catBreeds[currentBreedIndex].name}
            src={catBreeds[currentBreedIndex].image}
            alt={catBreeds[currentBreedIndex].name}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        </AnimatePresence>
        <div className="relative z-10 text-center">
          <motion.h1 
            className="text-6xl font-bold mb-4"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            All About Cats
          </motion.h1>
          <motion.p 
            className="text-xl"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover the fascinating world of our feline friends
          </motion.p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <Tabs defaultValue="facts" className="mb-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="facts"><Info className="mr-2 h-4 w-4" /> Feline Facts</TabsTrigger>
            <TabsTrigger value="breeds"><Paw className="mr-2 h-4 w-4" /> Popular Breeds</TabsTrigger>
            <TabsTrigger value="gallery"><ImageIcon className="mr-2 h-4 w-4" /> Gallery</TabsTrigger>
          </TabsList>
          <TabsContent value="facts">
            <Card id="facts">
              <CardHeader>
                <CardTitle>Feline Facts</CardTitle>
                <CardDescription>Interesting information about our furry friends</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {[
                    "Cats have been domesticated for over 4,000 years.",
                    "An adult cat has 30 teeth.",
                    "Cats can jump up to six times their length.",
                    "A group of cats is called a \"clowder\".",
                    "Cats spend 70% of their lives sleeping."
                  ].map((fact, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-center space-x-2"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Paw className="h-5 w-5 text-blue-500" />
                      <span>{fact}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="breeds">
            <Card id="breeds">
              <CardHeader>
                <CardTitle>Popular Cat Breeds</CardTitle>
                <CardDescription>Some well-known feline varieties</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {catBreeds.map((breed, index) => (
                    <motion.li 
                      key={breed.name} 
                      className="flex flex-col items-center space-y-2 bg-white p-4 rounded-lg shadow-md"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <img src={breed.image} alt={breed.name} className="w-32 h-32 rounded-full object-cover" />
                      <span className="text-lg font-semibold">{breed.name}</span>
                      <p className="text-sm text-gray-600 text-center">{breed.description}</p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toggleLike(breed.name)}
                      >
                        <Heart className={`h-4 w-4 mr-2 ${likedBreeds[breed.name] ? 'text-red-500 fill-red-500' : 'text-gray-500'}`} />
                        {likedBreeds[breed.name] ? 'Liked' : 'Like'}
                      </Button>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="gallery">
            <Card id="gallery">
              <CardHeader>
                <CardTitle>Cat Breed Gallery</CardTitle>
                <CardDescription>A visual showcase of different cat breeds</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {catBreeds.map((breed, index) => (
                    <motion.div 
                      key={breed.name} 
                      className="relative group overflow-hidden rounded-lg"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <img src={breed.image} alt={breed.name} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-lg font-semibold">{breed.name}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card id="quiz" className="mt-12">
            <CardHeader>
              <CardTitle>Cat Quiz</CardTitle>
              <CardDescription>Test your feline knowledge!</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleQuizSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 font-medium">What is a group of cats called?</label>
                    <input type="text" name="q1" className="border p-2 w-full rounded-md" required />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">How many teeth does an adult cat have?</label>
                    <input type="number" name="q2" className="border p-2 w-full rounded-md" required />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">What percentage of their lives do cats spend sleeping?</label>
                    <input type="number" name="q3" className="border p-2 w-full rounded-md" required />
                  </div>
                  <Button type="submit" className="w-full">Submit Quiz</Button>
                </div>
              </form>
              <AnimatePresence>
                {showQuizResult && (
                  <motion.div 
                    className="mt-4 p-4 bg-blue-100 rounded-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <p className="text-lg font-semibold">Your Score: {quizScore} / 3</p>
                    <p>{quizScore === 3 ? "Purr-fect! You're a cat expert!" : "Keep learning about our feline friends!"}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
