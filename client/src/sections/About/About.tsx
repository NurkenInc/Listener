import React from 'react'
export default function About() {
  return (
    <div className="flex items-center justify-center lg:gap-36">
            <div className="">
                <img className="lg:h-[75vh] h-0" src="getStartedNotes.png" alt="note papers" />
            </div>
            <div className="flex-1 px-10 py-10 flex flex-col gap-8">
                <h1 className="hero_title  lg:text-[144px] md:text-[100px] sm:text-[60px] text-[44px] lg:leading-[145.4px] md:leading-[114.4px] sm:leading-[74.4px] leading-[64.4px] uppercase text-black lg:text-left text-center">Who we are?</h1>
                <p>Welcome to Listener, the ultimate platform for streamlined note-taking and task management.
                <br /><br />
                At Listener, our mission is to empower users with a powerful, yet simple-to-use tool that makes organization and productivity effortless. Whether you're a student, professional, or simply someone looking to stay on top of things, Listener has everything you need to achieve your goals.
                <br /><br />

                We understand the importance of user feedback and are constantly working to improve the platform. That's why we are dedicated to delivering a best-in-class experience for our users, one that is both helpful and user-friendly.
                <br /><br />

                So why wait? Sign up now and start experiencing the benefits of Listener for yourself. We can't wait to hear your feedback and help you become more organized and productive than ever before</p>
            </div>
        </div>
  )
}