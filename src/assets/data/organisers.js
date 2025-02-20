import organiserImg01 from "../images/organiser-img01.png";
import organiserImg02 from "../images/organiser-img02.png";
import organiserImg03 from "../images/organiser-img03.png";

export const organisers = [
  {
    id: "01",
    name: "Fvents",
    specialization: "Corporate & Weddings",
    avgRating: 4.9,
    totalRating: 350,
    photo: organiserImg01,
    totalEvents: 1500,
    address: "Adyar, Chennai",
    experience: 10, // years of experience
    topEvents: [
      { title: "Luxury Wedding at Taj", eventDate: "2023-12-10", location: "Taj Coromandel, Chennai" },
      { title: "Tech Conference 2024", eventDate: "2024-04-15", location: "ITC Grand Chola, Chennai" }
    ],
    availableTimings: [
      { day: "Monday", startTime: "10:00 AM", endTime: "6:00 PM" },
      { day: "Friday", startTime: "12:00 PM", endTime: "8:00 PM" }
    ]
  },
  {
    id: "02",
    name: "Conx",
    specialization: "Concerts & Live Shows",
    avgRating: 4.7,
    totalRating: 289,
    photo: organiserImg02,
    totalEvents: 1120,
    address: "Tambaram, Chennai",
    experience: 8,
    topEvents: [
      { title: "Sunburn EDM Night", eventDate: "2023-11-05", location: "ECR Beach Arena, Chennai" },
      { title: "AR Rahman Live", eventDate: "2024-03-22", location: "Nehru Stadium, Chennai" }
    ],
    availableTimings: [
      { day: "Saturday", startTime: "6:00 PM", endTime: "11:00 PM" },
      { day: "Sunday", startTime: "5:00 PM", endTime: "10:00 PM" }
    ]
  },
  {
    id: "03",
    name: "PartyEx",
    specialization: "Private Parties & Weddings",
    avgRating: 4.8,
    totalRating: 310,
    photo: organiserImg03,
    totalEvents: 1210,
    address: "Madurai, Tamil Nadu",
    experience: 12,
    topEvents: [
      { title: "Royal Destination Wedding", eventDate: "2023-09-15", location: "Le Meridien, Coimbatore" },
      { title: "Elite New Year Party", eventDate: "2024-01-01", location: "Radisson Blu, Madurai" }
    ],
    availableTimings: [
      { day: "Wednesday", startTime: "2:00 PM", endTime: "9:00 PM" },
      { day: "Saturday", startTime: "4:00 PM", endTime: "11:00 PM" }
    ]
  }
];
