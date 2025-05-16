import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { EffectCoverflow } from "swiper/modules";
import { 
  FaBug, 
  FaExclamationTriangle, 
  FaServer, 
  FaUsers, 
  FaChartLine, 
  FaCode 
} from 'react-icons/fa';

const issues = [
  { 
    id: 1, 
    title: "Issue Tracking System", 
    description: "A modern platform for tracking and managing project issues efficiently. Streamline your workflow with our intuitive interface.", 
    icon: <FaBug />,
    category: "Features",
    priority: "High",
    stats: "Track 1000+ Issues"
  },
  { 
    id: 2, 
    title: "Team Collaboration", 
    description: "Enable seamless collaboration between team members. Assign tasks, share updates, and track progress in real-time.", 
    icon: <FaUsers />,
    category: "Teamwork",
    priority: "Medium",
    stats: "500+ Active Users"
  },
  { 
    id: 3, 
    title: "Analytics Dashboard", 
    description: "Get insights into your project's performance with detailed analytics and visual reports. Make data-driven decisions.", 
    icon: <FaChartLine />,
    category: "Analytics",
    priority: "High",
    stats: "Real-time Updates"
  },
  { 
    id: 4, 
    title: "Code Integration", 
    description: "Seamlessly integrate with your development workflow. Connect with popular version control systems and CI/CD pipelines.", 
    icon: <FaCode />,
    category: "Development",
    priority: "Critical",
    stats: "Git Integration"
  },
  { 
    id: 5, 
    title: "Server Monitoring", 
    description: "Keep track of your system's health with comprehensive monitoring tools. Get alerts for potential issues before they impact users.", 
    icon: <FaServer />,
    category: "Infrastructure",
    priority: "High",
    stats: "24/7 Monitoring"
  },
  { 
    id: 6, 
    title: "Priority Management", 
    description: "Efficiently manage issue priorities and deadlines. Ensure critical issues are addressed promptly with smart prioritization.", 
    icon: <FaExclamationTriangle />,
    category: "Management",
    priority: "Medium",
    stats: "Smart Alerts"
  }
];

const ParallaxSlider = () => {
  return (
    <div className="slider-container">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow]}
        className="mySwiper"
      >
        {issues.map((issue) => (
          <SwiperSlide key={issue.id}>
            <motion.div
              className="issue-card"
              whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0,0,0,0.2)" }}
            >
              <div className="issue-content">
                <div className="issue-icon">{issue.icon}</div>
                <h3>{issue.title}</h3>
                <p className="issue-description">{issue.description}</p>
                <div className="issue-meta">
                  <span className="issue-category">{issue.category}</span>
                  <span className={`issue-priority ${issue.priority.toLowerCase()}`}>
                    {issue.priority}
                  </span>
                </div>
                <div className="issue-stats">
                  <span className="stats-badge">{issue.stats}</span>
                </div>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ParallaxSlider;
