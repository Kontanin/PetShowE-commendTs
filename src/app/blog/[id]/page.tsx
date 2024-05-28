'use client';
import React from 'react';

export default function blogid() {
  return (
    <div>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white py-4 shadow">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">PROVOKE</h1>
            <nav>
              <a href="#" className="text-gray-900 font-medium">
                Lesson to Love
              </a>
              <span className="text-gray-600 mx-2">|</span>
              <a href="#" className="text-gray-900 font-medium">
                The Life You Live
              </a>
            </nav>
          </div>
        </header>

        <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <article className="prose max-w-none">
            <div className="text-center">
              <h2 className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-1">
                Motivation
              </h2>
              <h1 className="text-4xl font-extrabold text-gray-900">
                The Secret to Find a True Happiness
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                by Josiah Jones <span className="mx-1">|</span> July 23, 2019{' '}
                <span className="mx-1">|</span> 2 min read
              </p>
            </div>

            <p className="mt-6 text-lg text-gray-700">
              Embracing the new means being open to having more in your life.
              Many of you think that what you have created up until now is the
              best you can do. You make something and think that the first try
              is your best. But on the second and third tries you may do even
              better. As you create things in your life, you become better and
              more skilled. That is the process of life. A child who first
              begins walking is wobbly and unsteady. As the child practices she
              becomes strong and steady in her stride. It is the same with
              everything you do, for life is like a spiral in which you circle
              around again and again, often to the same issues.
            </p>

            <blockquote className="my-8 border-l-4 border-gray-200 pl-4 italic text-gray-700">
              Power comes from living in the present moment, where you can take
              action and create the future.
              <cite className="block text-gray-500 mt-2">Steve Roberts</cite>
            </blockquote>
          </article>
        </main>
      </div>
    </div>
  );
}
