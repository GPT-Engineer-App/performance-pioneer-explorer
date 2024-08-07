import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Paw, Info, Award, Image as ImageIcon } from "lucide-react";

const catBreeds = [
  { name: "Siamese", image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Siam_lilacpoint.jpg" },
  { name: "Persian", image: "https://upload.wikimedia.org/wikipedia/commons/1/15/White_Persian_Cat.jpg" },
  { name: "Maine Coon", image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Maine_Coon_cat_by_Tomitheos.JPG" },
  { name: "Bengal", image: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Paintedcats_Red_Star_standing.jpg" },
  { name: "Scottish Fold", image: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Adult_Scottish_Fold.jpg" },
];

const Index = () => {
  const [quizScore, setQuizScore] = useState(0);
  const [showQuizResult, setShowQuizResult] = useState(false);

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
      <nav className="bg-white shadow-md p-4">
        <ul className="flex justify-center space-x-6">
          <li><a href="#hero" className="text-blue-600 hover:text-blue-800">Home</a></li>
          <li><a href="#facts" className="text-blue-600 hover:text-blue-800">Facts</a></li>
          <li><a href="#breeds" className="text-blue-600 hover:text-blue-800">Breeds</a></li>
          <li><a href="#gallery" className="text-blue-600 hover:text-blue-800">Gallery</a></li>
          <li><a href="#quiz" className="text-blue-600 hover:text-blue-800">Quiz</a></li>
        </ul>
      </nav>

      <section id="hero" className="relative h-[500px] flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg" 
          alt="Cute cat" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 text-center">
          <h1 className="text-6xl font-bold mb-4">All About Cats</h1>
          <p className="text-xl">Discover the fascinating world of our feline friends</p>
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
                <ul className="list-disc pl-6 space-y-2">
                  <li>Cats have been domesticated for over 4,000 years.</li>
                  <li>An adult cat has 30 teeth.</li>
                  <li>Cats can jump up to six times their length.</li>
                  <li>A group of cats is called a "clowder".</li>
                  <li>Cats spend 70% of their lives sleeping.</li>
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
                <ul className="grid grid-cols-2 gap-4">
                  {catBreeds.map((breed) => (
                    <li key={breed.name} className="flex items-center space-x-2">
                      <img src={breed.image} alt={breed.name} className="w-12 h-12 rounded-full object-cover" />
                      <span>{breed.name}</span>
                    </li>
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
                  {catBreeds.map((breed) => (
                    <div key={breed.name} className="relative group">
                      <img src={breed.image} alt={breed.name} className="w-full h-48 object-cover rounded-lg" />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-lg font-semibold">{breed.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card id="quiz" className="mt-12">
          <CardHeader>
            <CardTitle>Cat Quiz</CardTitle>
            <CardDescription>Test your feline knowledge!</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleQuizSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2">What is a group of cats called?</label>
                  <input type="text" name="q1" className="border p-2 w-full" required />
                </div>
                <div>
                  <label className="block mb-2">How many teeth does an adult cat have?</label>
                  <input type="number" name="q2" className="border p-2 w-full" required />
                </div>
                <div>
                  <label className="block mb-2">What percentage of their lives do cats spend sleeping?</label>
                  <input type="number" name="q3" className="border p-2 w-full" required />
                </div>
                <Button type="submit">Submit Quiz</Button>
              </div>
            </form>
            {showQuizResult && (
              <div className="mt-4">
                <p className="text-lg font-semibold">Your Score: {quizScore} / 3</p>
                <p>{quizScore === 3 ? "Purr-fect! You're a cat expert!" : "Keep learning about our feline friends!"}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
