import React, { Suspense, useMemo, useState } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";

function RealTempleModel() {
  const { scene } = useGLTF("/models/hindu_temple.glb");
  return <primitive object={scene} scale={2.8} position={[0, -1.8, 0]} />;
}

useGLTF.preload("/models/hindu_temple.glb");

function TempleViewer() {
  return (
    <div className="temple-viewer">
      <Canvas camera={{ position: [2.5, 2.2, 4], fov: 38 }}>
        <ambientLight intensity={2.5} />
        <directionalLight position={[5, 8, 5]} intensity={4} />
        <directionalLight position={[-5, 4, -4]} intensity={2} />
        <Environment preset="sunset" />

        <Suspense fallback={null}>
          <RealTempleModel />
        </Suspense>

        <OrbitControls enableZoom enablePan={false} autoRotate autoRotateSpeed={1.2} />
      </Canvas>
    </div>
  );
}

function Card({ children }) {
  return <div className="info-card">{children}</div>;
}

function AncientTechnologyPage() {
  return (
    <section className="page-grid">
      <div className="content-panel">
        <span className="tag">🏛️ Ancient Indian Technology</span>
        <h1>360° Rotatable Real Temple Model</h1>
        <p>
          Explore a real 3D temple model inspired by ancient Indian architecture.
          Drag, rotate, zoom, and view the model from all sides.
        </p>

        <div className="card-grid">
          <Card>Iron Pillar of Delhi</Card>
          <Card>Temple Architecture</Card>
          <Card>Water Management Systems</Card>
          <Card>Textile Technology</Card>
        </div>
      </div>

      <TempleViewer />
    </section>
  );
}

function AyurvedaPage() {
  const medicines = [
    ["Triphala", "Supports digestion and bowel regularity"],
    ["Tulsi", "Used for cough, cold and respiratory wellness"],
    ["Ashwagandha", "Traditionally used for stress support and strength"],
    ["Neem", "Used for skin care and hygiene"],
    ["Amla", "Supports immunity and hair health"],
  ];

  return (
    <section className="page-grid">
      <div className="content-panel">
        <span className="tag green">🌿 Ayurveda & Medicine</span>
        <h1>Ayurvedic Preparation Animation</h1>
        <p>Animated representation of herbal medicine preparation.</p>

        <div className="medicine-list">
          {medicines.map(([name, use]) => (
            <Card key={name}>
              <b>{name}</b>
              <p>{use}</p>
            </Card>
          ))}
        </div>
      </div>

      <div className="animation-box">
        <motion.div className="circle" animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} />
        <motion.div className="herb" animate={{ y: [0, -25, 0] }} transition={{ duration: 2, repeat: Infinity }}>🌿</motion.div>
        <motion.div className="bowl" animate={{ rotate: [-8, 8, -8] }} transition={{ duration: 2, repeat: Infinity }}>🥣</motion.div>
      </div>
    </section>
  );
}

function BiodiversityPage() {
  const birds = useMemo(() => Array.from({ length: 8 }, (_, i) => i), []);

  return (
    <section className="page-grid">
      <div className="content-panel">
        <span className="tag blue">⛰️ Biodiversity in India</span>
        <h1>Western Ghats & Himalayas</h1>
        <p>Animated biodiversity landscape showing mountains, forests and wildlife.</p>

        <div className="medicine-list">
          <Card><b>Western Ghats:</b> rich in endemic species.</Card>
          <Card><b>Himalayas:</b> home to snow leopards and medicinal plants.</Card>
          <Card><b>Indo-Burma:</b> forests and wildlife diversity.</Card>
        </div>
      </div>

      <div className="nature-box">
        {birds.map((b) => (
          <motion.div
            key={b}
            className="bird"
            style={{ top: `${50 + b * 30}px` }}
            animate={{ x: [0, 900] }}
            transition={{ duration: 8 + b, repeat: Infinity, delay: b * 0.5 }}
          >
            🐦
          </motion.div>
        ))}
        <motion.div className="tiger" animate={{ x: [0, 80, 0] }} transition={{ duration: 5, repeat: Infinity }}>🐅</motion.div>
      </div>
    </section>
  );
}

export default function App() {
  const pages = [
    { title: "Technology", component: <AncientTechnologyPage /> },
    { title: "Ayurveda", component: <AyurvedaPage /> },
    { title: "Biodiversity", component: <BiodiversityPage /> },
  ];

  const [page, setPage] = useState(0);

  return (
    <main className="app">
      <header className="header">
        <p>Science Technology Knowledge Traditions in India</p>
        <h2>Ancient Indian Knowledge Experience</h2>

        <nav className="tabs">
          {pages.map((p, i) => (
            <button
              key={p.title}
              onClick={() => setPage(i)}
              className={page === i ? "active" : ""}
            >
              {p.title}
            </button>
          ))}
        </nav>
      </header>

      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, x: 70 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -70 }}
          transition={{ duration: 0.35 }}
        >
          {pages[page].component}
        </motion.div>
      </AnimatePresence>

      <div className="controls">
        <button onClick={() => setPage((p) => (p - 1 + pages.length) % pages.length)}>
          ← Previous
        </button>
        <span>Page {page + 1} / {pages.length}</span>
        <button onClick={() => setPage((p) => (p + 1) % pages.length)}>
          Next →
        </button>
      </div>
    </main>
  );
}