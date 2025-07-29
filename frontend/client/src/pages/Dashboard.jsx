import React, { useState, useEffect } from 'react'
import Sidebar from '../components/sidebar'
import StatCircle from '../components/StatCircle'
import { getStats } from '../services/apiCalls'

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalResumes: 0,
    activeResumes: 0,
    recentUploads: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getStats();
        if (response.success) {
          setStats(response.data);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1 flex flex-col items-center p-4'>
        <div className='w-full border-b pb-4 mb-8'>
          <h2 className='text-2xl font-semibold text-gray-700 text-center'>CV DATABASE STATISTICS</h2>
        </div>
        <div className='flex flex-wrap justify-center items-center gap-8 mt-4'>          
          <StatCircle
          title="Total Resumes"
          value={stats.totalResumes}
        />
          <StatCircle
            title="Active Resumes"
            value={stats.activeResumes}
          />
          <StatCircle
            title="Recent Uploads"
            value={stats.recentUploads}
          />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
