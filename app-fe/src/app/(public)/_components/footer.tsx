import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-primary text-black py-5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        <div className="flex items-center py-2">
          <span className="text-3xl font-semibold">Cooksy</span>
        </div>
        <p className="text-center max-w-xl text-sm font-normal leading-relaxed">
          Empowering creators worldwide with the most advanced AI content
          creation tools. Transform your ideas into reality.
        </p>
      </div>
      <div className="">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm font-normal">
          <Link href="/">Cooksy</Link> ©2025. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
