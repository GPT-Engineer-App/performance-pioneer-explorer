import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Paw, Info, Award, Image as ImageIcon, Heart, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const catBreeds = [
  { name: "Siamese", image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Siam_lilacpoint.jpg", description: "Known for their distinctive color points and blue almond-shaped eyes.", personality: "Vocal, intelligent, and affectionate", origin: "Thailand" },
  { name: "Persian", image: "https://upload.wikimedia.org/wikipedia/commons/1/15/White_Persian_Cat.jpg", description: "Characterized by their long, fluffy coat and round face.", personality: "Gentle, quiet, and docile", origin: "Iran (Persia)" },
  { name: "Maine Coon", image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Maine_Coon_cat_by_Tomitheos.JPG", description: "One of the largest domesticated cat breeds, known for their intelligence and playful personality.", personality: "Friendly, intelligent, and gentle", origin: "United States" },
  { name: "Bengal", image: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Paintedcats_Red_Star_standing.jpg", description: "Developed to look like exotic jungle cats such as leopards and ocelots.", personality: "Active, playful, and curious", origin: "United States" },
  { name: "Scottish Fold", image: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Adult_Scottish_Fold.jpg", description: "Characterized by a gene mutation that affects cartilage throughout the body, giving the ears a folded appearance.", personality: "Sweet-tempered, adaptable, and intelligent", origin: "Scotland" },
];

const catFacts = [
  { fact: "Cats have been domesticated for over 4,000 years.", icon: "🏛️" },
  { fact: "An adult cat has 30 teeth.", icon: "🦷" },
  { fact: "Cats can jump up to six times their length.", icon: "🦘" },
  { fact: "A group of cats is called a \"clowder\".", icon: "👥" },
  { fact: "Cats spend 70% of their lives sleeping.", icon: "😴" },
  { fact: "Cats have over 20 vocalizations, including the meow.", icon: "🗣️" },
  { fact: "A cat's sense of smell is 14 times stronger than a human's.", icon: "👃" },
  { fact: "Cats have a third eyelid called the 'haw' to protect their eyes.", icon: "👁️" },
];

const Index = () => {
  const [quizScore, setQuizScore] = useState(0);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [likedBreeds, setLikedBreeds] = useState({});
  const [currentBreedIndex, setCurrentBreedIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;
    if (isAutoPlay) {
      interval = setInterval(() => {
        setCurrentBreedIndex((prevIndex) => (prevIndex + 1) % catBreeds.length);
        setProgress(0);
      }, 5000);

      const progressInterval = setInterval(() => {
        setProgress((prevProgress) => (prevProgress + 1) % 100);
      }, 50);

      return () => {
        clearInterval(interval);
        clearInterval(progressInterval);
      };
    }
  }, [isAutoPlay]);

  const toggleLike = (breedName) => {
    setLikedBreeds((prev) => ({ ...prev, [breedName]: !prev[breedName] }));
  };

  const handleQuizSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const answers = Object.fromEntries(formData);
    let score = 0;
    if (answers.q1.toLowerCase() === "clowder") score++;
    if (answers.q2 === "30") score++;
    if (answers.q3 === "70") score++;
    setQuizScore(score);
    setShowQuizResult(true);
  };

  const nextBreed = () => {
    setCurrentBreedIndex((prevIndex) => (prevIndex + 1) % catBreeds.length);
    setProgress(0);
  };

  const prevBreed = () => {
    setCurrentBreedIndex((prevIndex) => (prevIndex - 1 + catBreeds.length) % catBreeds.length);
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100">
      <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
        <ul className="flex justify-center space-x-6">
          {["Home", "Facts", "Breeds", "Gallery", "Quiz"].map((item) => (
            <motion.li key={item} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <a href={`#${item.toLowerCase()}`} className="text-blue-600 hover:text-blue-800 transition-colors">
                {item}
              </a>
            </motion.li>
          ))}
        </ul>
      </nav>

      <section id="hero" className="relative h-[600px] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <AnimatePresence mode="wait">
          <motion.img 
            key={catBreeds[currentBreedIndex].name}
            src={catBreeds[currentBreedIndex].image}
            alt={catBreeds[currentBreedIndex].name}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
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
            className="text-xl mb-8"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover the fascinating world of our feline friends
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button onClick={() => setIsAutoPlay(!isAutoPlay)} variant="outline" className="bg-white text-black">
              {isAutoPlay ? "Pause" : "Play"} Slideshow
            </Button>
          </motion.div>
        </div>
        <Button onClick={prevBreed} variant="outline" className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40">
          <ChevronLeft className="h-8 w-8" />
        </Button>
        <Button onClick={nextBreed} variant="outline" className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40">
          <ChevronRight className="h-8 w-8" />
        </Button>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-1/3">
          <Progress value={progress} className="h-1 bg-white/30" indicatorClassName="bg-white" />
        </div>
        <motion.div 
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-white/80 text-black p-4 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-2">{catBreeds[currentBreedIndex].name}</h2>
          <p className="text-sm">{catBreeds[currentBreedIndex].description}</p>
        </motion.div>
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
                <Carousel className="w-full max-w-xs mx-auto">
                  <CarouselContent>
                    {catFacts.map((fact, index) => (
                      <CarouselItem key={index}>
                        <Card className="bg-gradient-to-br from-blue-100 to-purple-100">
                          <CardContent className="flex flex-col items-center justify-center p-6 h-48">
                            <motion.div
                              className="text-4xl mb-4"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            >
                              {fact.icon}
                            </motion.div>
                            <p className="text-center text-sm">{fact.fact}</p>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
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
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {catBreeds.map((breed, index) => (
                    <motion.li 
                      key={breed.name} 
                      className="flex flex-col items-center space-y-2 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Avatar className="w-40 h-40">
                        <AvatarImage src={breed.image} alt={breed.name} />
                        <AvatarFallback>{breed.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-xl font-semibold mt-4">{breed.name}</span>
                      <Badge variant="secondary">{breed.origin}</Badge>
                      <p className="text-sm text-gray-600 text-center">{breed.description}</p>
                      <p className="text-sm font-medium text-blue-600">{breed.personality}</p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toggleLike(breed.name)}
                        className="mt-4 transition-colors duration-300"
                      >
                        <Heart className={`h-5 w-5 mr-2 transition-colors duration-300 ${likedBreeds[breed.name] ? 'text-red-500 fill-red-500' : 'text-gray-500'}`} />
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
                      whileHover={{ scale: 1.05 }}
                    >
                      <img src={breed.image} alt={breed.name} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col items-center justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-lg font-semibold">{breed.name}</span>
                        <span className="text-white text-sm">{breed.origin}</span>
                      </div>
                      <motion.div 
                        className="absolute top-2 right-2 bg-white rounded-full p-1"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Star className={`h-5 w-5 ${likedBreeds[breed.name] ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} onClick={() => toggleLike(breed.name)} />
                      </motion.div>
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
                <div className="space-y-6">
                  <div>
                    <label className="block mb-2 font-medium text-lg">What is a group of cats called?</label>
                    <input type="text" name="q1" className="border p-3 w-full rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 transition-shadow duration-300" required />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium text-lg">How many teeth does an adult cat have?</label>
                    <input type="number" name="q2" className="border p-3 w-full rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 transition-shadow duration-300" required />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium text-lg">What percentage of their lives do cats spend sleeping?</label>
                    <input type="number" name="q3" className="border p-3 w-full rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 transition-shadow duration-300" required />
                  </div>
                  <Button type="submit" className="w-full text-lg py-3">Submit Quiz</Button>
                </div>
              </form>
              <AnimatePresence>
                {showQuizResult && (
                  <motion.div 
                    className="mt-6 p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg shadow-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <h3 className="text-2xl font-bold mb-2">Quiz Results</h3>
                    <p className="text-xl font-semibold mb-2">Your Score: {quizScore} / 3</p>
                    <p className="text-lg">
                      {quizScore === 3 ? (
                        <span className="text-green-600">Purr-fect! You're a cat expert! 🏆</span>
                      ) : quizScore === 2 ? (
                        <span className="text-blue-600">Great job! You're almost there! 😺</span>
                      ) : quizScore === 1 ? (
                        <span className="text-yellow-600">Not bad! Keep learning about our feline friends! 📚</span>
                      ) : (
                        <span className="text-red-600">Oops! Time to brush up on your cat knowledge! 🐾</span>
                      )}
                    </p>
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
