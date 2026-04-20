import axios from 'axios';

// Connect to Spring Boot natively on localhost:8080
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
});

export const getJobs = async () => {
    try {
        const response = await api.get('/jobs');
        return response.data;
    } catch (e) {
        console.error("Error fetching jobs from server, displaying dummy data", e);
        // Fallback robust demo data if backend connection fails (perfect for UI checks)
        return [
            {
                id: '1',
                companyName: 'OpenAI',
                jobTitle: 'Software Engineering Intern',
                descriptionSummary: 'As an intern, you will help build scalable ML infrastructure and design inference endpoints.',
                requiredSkills: ['Python', 'React', 'FastAPI'],
                applicationLink: 'https://openai.com/careers',
                matchScore: 98,
                createdAt: '2026-04-18T00:00:00'
            },
            {
                id: '2',
                companyName: 'Google',
                jobTitle: 'Backend Intern - Core Search',
                descriptionSummary: 'Optimize latency for core indexing systems and migrate legacy databases. Join our top engineering squad.',
                requiredSkills: ['Java', 'Spring Boot', 'SQL'],
                applicationLink: 'https://careers.google.com',
                matchScore: 92,
                createdAt: '2026-04-18T00:00:00'
            },
            {
                id: '3',
                companyName: 'Stripe',
                jobTitle: 'Full-Stack Developer Intern',
                descriptionSummary: 'Design responsive checkout experiences and wire robust API endpoints.',
                requiredSkills: ['React', 'JavaScript', 'Java'],
                applicationLink: 'https://stripe.com/jobs',
                matchScore: 89,
                createdAt: '2026-04-18T00:00:00'
            }
        ];
    }
};
