import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { searchResumes, downloadResume, downloadAllResumes } from '../services/apiCalls';
import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
  Stack,
  Button
} from '@mui/material';
import { toast } from 'react-toastify';

const TableData = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const mp = new Map();

  const educationLevelMap = {
    PH: "Doctorate",
    PG: "Post Graduation",
    UG: "Under Gradation",
    DP: "Diploma",
    HS: "High School"
  };

  const departmentMap = {
    TC: "Technical",
    CS: "Cyber Security",
    CM: "Content Media",
    OT: "Others"
  };

  const typesOfFilters = ['name', 'contact no', 'email', 'country', 'city', 'primary skills', 'last organization'
    , 'secondary skills', 'education', 'specialization', 'years of experience', 'department', 'willing to relocate'
  ]

  mp.set('name', 'candidateName');
  mp.set('contact no', 'contactNumber');
  mp.set('primary skills', 'primarySkillset');
  mp.set('secondary skills', 'secondarySkillset');
  mp.set('years of experience', 'workExperience');
  mp.set('last organization', 'lastOrganization');
  mp.set('education', 'highestEducation')


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get search parameters from URL
        const params = new URLSearchParams(location.search);
        // console.log(params)
        const searchParams = {};

        // Convert URL params to an object
        for (const [key, value] of params.entries()) {
          const backendKey = mp.get(key) || key; // fallback to original key if not mapped
          searchParams[backendKey] = value;
        }
        // console.log('URL Search Params:', location.search);
        // console.log('Parsed Search Params:', searchParams);

        // Only make API call if we have search parameters
        if (Object.keys(searchParams).length > 0) {
          // console.log('Making search with params:', searchParams);
          const response = await searchResumes(searchParams);
          setData(response.data || []);
          
        } else {
          // console.log('Making search with no params');
          const response = await searchResumes({});
          setData(response.data || []);
        }  setPage(1)
      } catch (err) {
        toast.error(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [location.search]);

  // Calculate pagination
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentPageData = data.slice(startIndex, endIndex);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleDownload = async (id) => {
    try {
      setLoading(true);
      const data = await downloadResume(id);
      // Create a download URL and trigger download
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `resume-${id}.pdf`); // You might want to adjust the filename
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message || 'Failed to download resume');
      toast.error('Failed to download resume');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadAll = async () => {
    try {
      setLoading(true);
      
      // Get current search parameters from URL
      const params = new URLSearchParams(location.search);
      const searchParams = {};
      
      // Convert URL params to an object using the same mapping as search
      for (const [key, value] of params.entries()) {
        const backendKey = mp.get(key) || key; // fallback to original key if not mapped
        searchParams[backendKey] = value;
      }
      
      await downloadAllResumes(searchParams);
      toast.success('Download started successfully',{
        autoClose: 1000
      });
    } catch (error) {
      console.error('Failed to download resumes:', error);
      toast.error('Failed to download resumes');
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   const handleBeforeUnload = (event) => {
  //     // Cancel the event as per the modern browser standards
  //     event.preventDefault();
  //     // Chrome requires returnValue to be set
  //     event.returnValue = '';
  //   };

  //   window.addEventListener('beforeunload', handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        {error}
      </div>
    );
  }

  if (!loading && data.length === 0) {
    return (
      <div className="text-gray-500 text-center p-4">
        No results found
      </div>
    );
  }

  return (
    <div>
      <div className='flex justify-end'>
        <Button
          id="submit-button"
          variant="contained"
          sx={{
            backgroundColor: 'rgb(217,234,253)',
            color: '#000',
            '&:hover': {
              backgroundColor: 'rgb(200,220,250)',
            },
          }}
          type='button'
          onClick={handleDownloadAll}
          disabled={loading}
        >
          {loading ? 'Downloading...' : 'Get All Resumes'}
        </Button>
      </div>
      <div className="w-full overflow-hidden">

        <TableContainer component={Paper} className="mt-4">
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ py: 1.5 }} className="text-sm font-semibold">#</TableCell>
                <TableCell sx={{ py: 1.5 }} className="text-sm font-semibold">Name</TableCell>
                <TableCell sx={{ py: 1.5 }} className="text-sm font-semibold">Contact Details</TableCell>
                <TableCell sx={{ py: 1.5 }} className="text-sm font-semibold">Location</TableCell>
                <TableCell sx={{ py: 1.5 }} className="text-sm font-semibold">Relocation-Ready | Passport Valid</TableCell>
                <TableCell sx={{ py: 1.5 }} className="text-sm font-semibold">Work Experience</TableCell>
                <TableCell sx={{ py: 1.5 }} className="text-sm font-semibold">Skills</TableCell>
                <TableCell sx={{ py: 1.5 }} className="text-sm font-semibold">Organization & Department</TableCell>
                <TableCell sx={{ py: 1.5 }} className="text-sm font-semibold">Qualification</TableCell>
                <TableCell sx={{ py: 1.5 }} className="text-sm font-semibold">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentPageData.map((row, index) => (
                <TableRow key={startIndex + index}>
                  {/* index */}
                  <TableCell sx={{ py: 1 }} className="text-sm">{startIndex + index + 1}</TableCell>
                  {/* name details */}
                  <TableCell sx={{ py: 1 }} className="text-sm">{row.candidateName}</TableCell>
                  {/* contact details */}
                  <TableCell sx={{ py: 1 }}>
                    <div>
                      <div className="text-sm">{row.contactNumber}</div> {/* contact number */}
                      <div className="text-xs text-gray-500">{row.email}</div> {/* email */}
                    </div>
                  </TableCell>
                  {/* location */}
                  <TableCell sx={{ py: 1 }}>
                    <div>
                      <div className="text-sm">{row.city}</div> {/* city */}
                      <div className="text-xs text-gray-500">{row.country}</div> {/* country */}
                    </div>
                  </TableCell>
                  {/* willing to relocate and valid passport*/}
                  <TableCell sx={{ py: 1 }}>
                    <div>
                      <div className="text-sm">{row.willingToRelocate ? 'Yes' : 'No'}</div> {/* wiling to reloacate */}
                      <div className="text-xs text-gray-500">{row.validPassport ? 'Yes' : 'No'}</div> {/* valid passport */}
                    </div>
                  </TableCell>

                  <TableCell sx={{ py: 1 }} className="text-sm">{row.workExperience} years</TableCell> {/* workexp */}
                  {/* skills */}
                  <TableCell sx={{ py: 1 }}>
                    <div>
                      <div className="text-sm">Primary: {row.primarySkillset}</div>{/* primary skills */}
                      <div className="text-xs text-gray-500">Secondary: {row.secondarySkillset}</div>{/* secondary skills */}
                    </div>
                  </TableCell>             
                  {/* last organization and department*/}   
                  <TableCell sx={{ py: 1 }}>
                    <div>
                      <div className="text-sm">{row.lastOrganization}</div> {/* last organization*/}
                      <div className="text-xs text-gray-500">{departmentMap[row.department]}</div>{/*department*/}
                    </div>
                  </TableCell>
                  {/* Qualification */}
                  <TableCell sx={{ py: 1 }} className="text-sm">{educationLevelMap[row.highestEducation]}</TableCell>

                  <TableCell sx={{ py: 1 }}> {/* Storing the resume id for individual downloading */}
                    <button 
                      className="text-xs text-blue-600 hover:underline"
                      onClick={() => handleDownload(row.id)}
                      disabled={loading}
                    >
                      {loading ? 'Downloading...' : 'Download'}
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {data.length > 0 && (
          <Stack spacing={2} alignItems="center" className="my-4">
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
            />
          </Stack>
        )}
      </div>
    </div>
  );
};

export default TableData;
