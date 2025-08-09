import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "react-vertical-timeline-component/style.min.css";

import { SectionWrapper } from "../../hoc";
import { Header } from "../atoms/Header";
import { TExperience } from "../../types";
import { config } from "../../constants/config";
import { qwegle, shopify, starbucks } from "../../assets";

const experiences = [
  {
    title: "Cybersecurity Intern",
    companyName: "Qwegle (Octamy)",
    icon: qwegle,
    iconBg: "#383E56",
    date: "Current",
    points: [
      "Working on real-world cybersecurity applications, including vulnerability detection and secure coding practices.",
      "Analyzing modern web security threats and attack vectors.",
      "Collaborating with the team on developing protective solutions for enterprise-level clients.",
      "Implementing security best practices in software development life cycle.",
    ],
  },
  {
    title: "Founder & Developer",
    companyName: "SecureWebX (Chrome Extension)",
    icon: shopify,
    iconBg: "#E6DEDD",
    date: "2025 - Present",
    points: [
      "Developing a Chrome extension to detect web vulnerabilities including XSS, SQLi, and insecure headers.",
      "Implementing security scanning for cookies, mixed content, and TLS issues.",
      "Implementing premium features like CVE scanner, threat API, and CSP generator.",
      "Designing and developing a clickjacking detector for enhanced web security.",
    ],
  },
  {
    title: "Co-Founder & Developer",
    companyName: "WeAreSafe (Mobile & Web App)",
    icon: starbucks,
    iconBg: "#383E56",
    date: "2023 - Present",
    points: [
      "Built a safety platform for women, with special focus on those with disabilities.",
      "Implemented SOS calling and real-time geolocation tracking features.",
      "Integrated psychiatrist support and Red Zone alerts for enhanced safety.",
      "Developed both mobile and web interfaces for maximum accessibility.",
    ],
  },
  {
    title: "Member",
    companyName: "Cisco thingQbator Club, Trident Academy of Technology",
    icon: starbucks,
    iconBg: "#E6DEDD",
    date: "2023 - Present",
    points: [
      "Identify, analyze, and fix security vulnerabilities in IoT prototypes, web apps, and innovation projects.",
      "Conduct penetration testing and debugging to ensure robust security.",
      "Implement secure coding practices across development stages.",
      "Collaborate with team members to integrate cybersecurity from project inception.",
      "Protect solutions against potential cyber threats while maintaining reliability.",
      "Support innovation by ensuring compliance with high security standards."
    ],
  },
];

const ExperienceCard: React.FC<TExperience> = (experience) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#1d1836",
        color: "#fff",
      }}
      contentArrowStyle={{ borderRight: "7px solid  #232631" }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className="flex h-full w-full items-center justify-center">
          <img
            src={experience.icon}
            alt={experience.companyName}
            className="h-[60%] w-[60%] object-contain"
          />
        </div>
      }
    >
      <div>
        <h3 className="text-[24px] font-bold text-white">{experience.title}</h3>
        <p
          className="text-secondary text-[16px] font-semibold"
          style={{ margin: 0 }}
        >
          {experience.companyName}
        </p>
      </div>

      <ul className="ml-5 mt-5 list-disc space-y-2">
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className="text-white-100 pl-1 text-[14px] tracking-wider"
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  return (
    <>
      <Header useMotion={true} {...config.sections.experience} />

      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} {...experience} />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
