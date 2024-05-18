import React from 'react'
import { FaGithub } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import Link from 'next/link';
import Image from 'next/image';

function Dev() {
  return (
<div className=" bg-gray-100 text-center ">
<h1 className="text-4xl font-bold text-start text-gray-700 py-3">About Dev</h1>

<img className='w-64 h-64 overflow-hidden mx-auto mb-4 rounded-full shadow-lg' src="/mypic.jpg" />

  <h3 className="text-xl font-semibold mb-2">Software Developer</h3>





  <h2 className="text-lg mb-4">Welcome to my website. I&apos;m Konatnin, a software developer.</h2>
  <h1 className=" flex justify-starttext-2xl font-bold my-2">My Experience </h1>


  <div className="grid grid-cols-4 my-20">
        <Image src="/profile/IoT.png" alt="IoT" width={100} height={100} />
        <Image src="/profile/crystal-reports.png" alt="Crystal Reports" width={200} height={200} />
        <Image src="/profile/node.png" alt="Node.js" width={100} height={100} />
        <Image src="/profile/react.png" alt="React" width={100} height={100} />
      </div>
  
  <h2>
  with experience in IoT applications, APIs, and data management. 
  </h2>
  <h2>
  Additionally, I also specialize in both frontend and backend development for websites.
  </h2>
  





  <h5>Connext me</h5>
  <div className="flex justify-center space-x-4">
<Link href="https://www.linkedin.com/in/kontanin-hokthian/">
  <FaLinkedin size={50} />
</Link>
  <Link href="https://www.facebook.com/brightboss/" >
<FaFacebookSquare size={50} />
</Link>
<Link href="https://github.com/Kontanin">
  <FaGithub size={50} />
</Link>



  </div>
</div>
  )
}

export default Dev