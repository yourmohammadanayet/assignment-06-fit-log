import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import WorkoutLibrary from "../components/WorkoutLibrary";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <WorkoutLibrary />
      </main>
    </>
  );
}