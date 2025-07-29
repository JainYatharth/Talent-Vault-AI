import React, { useEffect, useRef, useState } from 'react';
import {
	TextField,
	Button,
	FormControlLabel,
	Box,
	Typography,
	Stack,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Paper,
	RadioGroup,
	Radio,
	Divider
} from '@mui/material';
import download_icon from '../assets/download_icon.svg'
import { uploadResumeCall } from '../services/apiCalls';
import { parseResumeCall } from '../services/apiCalls';
import { toast, ToastContainer } from 'react-toastify';

const Upload_form = () => {


	const current_date = new Date().getFullYear();
	const id = 10

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [countryCode, setCountryCode] = useState('+91')
	const [contactNumber, setcontactNumber] = useState('')
	const [country, setCountry] = useState('')
	const [city, setCity] = useState('')

	const [primarySkills, setPrimarySkills] = useState('');
	const [secondarySkills, setSecondarySkills] = useState('')

	const [education, setEducation] = useState('')
	const [specialization, setSpecialization] = useState('')

	const [resume, setResume] = useState(null)
	const [yoe, setYoe] = useState('')
	const [department, setDepartment] = useState('')
	const [currentStatus, setCurrentStatus] = useState('')
	const [lastOrganization, setLastOrganization] = useState('')
	const [willingToRelocate, setWillingToRelocate] = useState('')
	const [passportAvailable, setPassportAvailable] = useState('')
	const [expiry, setExpiry] = useState()


	const validationRules = {
		name: {
			fieldName: "Name",
			required: true,
			minLength: 2,
			pattern: /^[A-Za-z\s.]+$/,
		},
		email: {
			fieldName: "Email",
			required: true,
			pattern: /^\S+@\S+\.\S+$/,
		},
		contactNumber: {
			fieldName: "Contact number",
			required: true,
			pattern: /^\d{10}$/,
		},
		city: {
			fieldName: "City",
			pattern: /^[A-Za-z\s.]+$/,
		},
		primarySkills: {
			fieldName: "Primary skills",
			required: true,
		},
		secondarySkills: {
			fieldName: "Secondary skills",
			required: true,
		},
		resume: {
			fieldName: "Resume",
			required: true,
			validate: (file) => {
				if (!file) return "Resume is required";
				if (file.type !== "application/pdf") {
					return "Only PDF files are allowed";
				}
				return true;
			},
		},
		lastOrganization: {
			fieldName: "Last organization",
			required: true,
		},
		yoe: {
			fieldName: "Years of experience",
			required: true,
			validate: (value) => {
				const yearsExp = Number(value);
				if (isNaN(yearsExp)) {
					return "Years of experience must be a number"
				}
				if (yearsExp < 0) {
					return "Experience must greater than equal to 0"
				}
				return true
			}
		},
		expiry: {
			fieldName: "Expiry",
			validate: (value) => {
				const exp = Number(value)
				if (exp < current_date) {
					return "Invalid: Passport expiry date has passed."
				}
				return true
			}
		}

	};


	const validateForm = (formData) => {
		let allValid = true;

		for (const field in validationRules) {
			const rules = validationRules[field];
			const value = formData[field]?.trim?.() || formData[field];

			if (rules.required && (!value || value === "")) {
				toast.error(`${rules.fieldName} is required`);
				allValid = false;
				continue;
			}

			if (rules.minLength && value.length < rules.minLength) {
				toast.error(`${rules.fieldName} must be atleast ${rules.minLength} characters`);
				allValid = false;
			}

			if (rules.pattern && !rules.pattern.test(value)) {
				toast.error(`Invalid ${rules.fieldName}`);
				allValid = false;
			}

			if (typeof rules.validate === "function") {
				const result = rules.validate(value);
				if (result !== true) {
					toast.error(result);
					allValid = false;
				}
			}
		}

		return allValid;
	};


	const handleUploadResume = async (e) => {
		const validationObject = {
			name: name,
			email: email,
			contactNumber: contactNumber,
			city: city,
			primarySkills: primarySkills,
			secondarySkills: secondarySkills,
			specialization: specialization,
			resume: resume,
			lastOrganization: lastOrganization,
			yoe: yoe,
			expiry: expiry,
		};

		const isValid = validateForm(validationObject);

		if (!isValid) {
			e.preventDefault();
			console.log(isValid);
			return;
		}

		const formData = new FormData();

		formData.append('candidateName', name);
		formData.append('email', email);
		formData.append('countryCode', countryCode);
		formData.append('contactNumber', contactNumber);
		formData.append('country', country);
		formData.append('city', city);
		formData.append('primarySkill', primarySkills);
		formData.append('secondarySkill', secondarySkills);
		formData.append('highestEducation', education);
		formData.append('specialization', specialization);
		formData.append('workExperience', yoe);
		formData.append('department', department);
		formData.append('currentStatus', currentStatus);
		formData.append('lastOrganization', lastOrganization);
		formData.append('willingToRelocate', willingToRelocate);
		formData.append('validPassport', passportAvailable === 'true');
		if (passportAvailable) {
			formData.append("passportExpiryYear", expiry);
		}
		if (resume) {
			formData.append('file', resume);
		}

		try {
			// Get token from localStorage
			const token = localStorage.getItem('token');


			if (!token) {
				toast.error('Please login first!');
				return;
			}

			// Send formData + Authorization header
			const response = await uploadResumeCall(formData, token);

			if (response && response.success) {
				toast.success("Resume uploaded successfully!", {
					onClose: () => {
						window.location.reload();
					},
					autoClose: 1500,
					closeOnClick: true,
					pauseOnHover: true,
				});
			} else {
				e.preventDefault();
				toast.error(response?.message || 'Failed to upload resume');
			}
		} catch (error) {
			e.preventDefault();
			toast.error(error?.message || 'Error uploading resume');
		}
	};

	const handleFileSubmit = async (e) => {
		try {
			const selectedFile = e.target.files[0];
			setResume(selectedFile);

			const parsed = await parseResumeCall(selectedFile);

			setName(parsed.candidateName || '');
			setEmail(parsed.email || '');
			setcontactNumber(parsed.contactNumber || '');
			setCountry(parsed.country || '');
			setCountryCode(parsed.code || '');
			setCity(parsed.city || '');
			setEducation(parsed.highestEducation || '');
			setSpecialization(parsed.specialization || '');
			setPrimarySkills(parsed.primarySkill || '');
			setSecondarySkills(parsed.secondarySkill || '');
			setYoe(parsed.workExperience || '');
			setLastOrganization(parsed.lastOrganization || '');
			setDepartment(parsed.department || '');
			setCurrentStatus(parsed.currentStatus || '');

			console.log('Parsed Resume Data:', parsed);
		} catch (error) {
			console.error('Parsing error:', error);
			alert('Resume parsing failed.');
		}
	};

	return (
		<form onSubmit={handleUploadResume} className='w-full'>
			<Box className='w-full space-y-6' sx={{ p: 3 }}>
				{/* PERSONAL DETAILS */}
				<Paper sx={{ p: 3 }} elevation={3}>
					<Typography
						variant="h5"
						gutterBottom
						className=' text-gray-700 px-3 rounded-md w-fit font-semibold'
						sx={{ mb: 0 }}
					>
						Personal Information
					</Typography>
					<Divider sx={{ mt: 2, mb: 3 }} />

					<Stack spacing={3}>
						{/* Name */}
						<Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
							<TextField
								id="name-input"
								sx={{ flex: 1, minWidth: '250px', maxWidth: '400px' }}
								label="Name*"
								variant="outlined"
								size="small"
								value={name}
								onChange={(e) => setName(e.target.value)}
								spellCheck={false}
							/>
						</Box>

						{/* Email */}
						<Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
							<TextField
								id="email-input"
								sx={{ flex: 1, minWidth: '250px', maxWidth: '400px' }}
								label="Email*"
								type="email"
								variant="outlined"
								size="small"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								spellCheck={false}
							/>
						</Box>

						{/* contactNumber Number with Country Code */}
						<Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
							<FormControl sx={{ width: '120px' }} size="small">
								<InputLabel>Code</InputLabel>
								<Select id="country-code-select" label="Code" defaultValue="+91" value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
									<MenuItem value="+91">+91 IN</MenuItem>
									<MenuItem value="+1">+1 US/CA</MenuItem>
								</Select>
							</FormControl>

							<TextField
								id="contactNumber-input"
								sx={{ flex: 1, minWidth: '200px', maxWidth: '200px' }}
								label="Contact Number*"
								variant="outlined"
								size="small"
								value={contactNumber}
								onChange={(e) => setcontactNumber(e.target.value)}
							/>
						</Box>

						{/* City and Country */}
						<Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
							<TextField
								id="city-input"
								sx={{ flex: 1, minWidth: '200px', maxWidth: '200px' }}
								label="City"
								variant="outlined"
								size="small"
								value={city}
								onChange={(e) => setCity(e.target.value)}
							/>
							<FormControl sx={{ flex: 1, minWidth: '250px', maxWidth: '350px' }} size="small">
								<InputLabel>Country</InputLabel>
								<Select id="country-select" label="Country" value={country} onChange={(e) => setCountry(e.target.value)}>
									<MenuItem value="India">India</MenuItem>
									<MenuItem value="United States">United States</MenuItem>
									<MenuItem value="Canada">Canada</MenuItem>
								</Select>
							</FormControl>
						</Box>
					</Stack>
				</Paper>
				{/* SKILLS */}
				<Paper sx={{ p: 3 }} elevation={3}>
					<Typography
						variant="h5"
						gutterBottom
						className=' text-gray-700 px-3 rounded-md w-fit font-semibold'
						sx={{ mb: 0 }}
					>
						Skill Set
					</Typography>
					<Divider sx={{ mt: 2, mb: 3 }} />

					<Stack spacing={3}>
						<Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
							<TextField
								id="primary-skills-input"
								sx={{ flex: 1, minWidth: '250px', maxWidth: '500px' }}
								label="Primary Skills*"
								variant="outlined"
								size="small"
								value={primarySkills}
								onChange={(e) => setPrimarySkills(e.target.value)}
								spellCheck={false}
							/>
						</Box>
						<Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
							<TextField
								id="secondary-skills-input"
								sx={{ flex: 1, minWidth: '250px', maxWidth: '500px' }}
								label="Secondary Skills*"
								variant="outlined"
								size="small"
								value={secondarySkills}
								onChange={(e) => setSecondarySkills(e.target.value)}
								spellCheck={false}
							/>
						</Box>
					</Stack>

				</Paper>

				{/* EDUCATION */}

				<Paper sx={{ p: 3 }} elevation={3}>
					<Typography
						variant="h5"
						gutterBottom
						className=' text-gray-700 px-3 rounded-md w-fit font-semibold'
						sx={{ mb: 0 }}
					>
						Educational qualification
					</Typography>
					<Divider sx={{ mt: 2, mb: 3 }} />

					<Stack spacing={3}>
						<Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
							<FormControl sx={{ flex: 1, minWidth: '250px', maxWidth: '400px' }} size="small">
								<InputLabel>Education*</InputLabel>
								<Select id="education-select" label="Education" value={education} onChange={(e) => setEducation(e.target.value)}>

									<MenuItem value="PH">Doctorate</MenuItem>
									<MenuItem value="PG">Post Graduation</MenuItem>
									<MenuItem value="UG">Under Graduation</MenuItem>
									<MenuItem value="DP">Diploma</MenuItem>
									<MenuItem value="HS">High School</MenuItem>

								</Select>
							</FormControl>
						</Box>

						<Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
							<TextField
								id="specialization-input"
								sx={{ flex: 1, minWidth: '250px', maxWidth: '400px' }}
								label="Specialization"
								variant="outlined"
								size="small"
								value={specialization}
								onChange={(e) => setSpecialization(e.target.value)}
								spellCheck={false}
							/>
						</Box>
					</Stack>

				</Paper>

				<Paper sx={{ p: 3 }} elevation={3}>
					<Typography
						variant="h5"
						gutterBottom
						className=' text-gray-700 px-3 rounded-md w-fit font-semibold'
						sx={{ mb: 0 }}
					>
						Professional details
					</Typography>
					<Divider sx={{ mt: 2, mb: 3 }} />
					<Stack spacing={3}>
						<Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
							<input
								id="resume-upload"
								type="file"
								accept=".pdf"
								style={{ display: 'none' }}
								onChange={handleFileSubmit}
							/>
							<label htmlFor="resume-upload" className='inline-flex w-[300px] '>
								<Button
									variant="contained"
									component="span"
									startIcon={<img className='w-5' src={download_icon} alt="Upload" />}
									sx={{
										backgroundColor: 'rgb(217,234,253)',
										color: '#000',
										'&:hover': {
											backgroundColor: 'rgb(200,220,250)',
										},
									}}
								>
									<span className='truncate w-full inline-block'>
										{resume ? `${resume.name}` : 'Upload resume'}
									</span>
								</Button>
							</label>
						</Box>

						<Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
							<TextField
								id="yoe-input"
								sx={{ flex: 1, maxWidth: '250px' }}
								label="Years Of Experience*"
								type="number"
								variant="outlined"
								size="small"
								value={yoe}
								onChange={(e) => setYoe(e.target.value)}
							/>
						</Box>

						<Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
							<TextField
								id="last-org-input"
								sx={{ flex: 1, minWidth: '250px', maxWidth: '400px' }}
								label="Last Organization*"
								variant="outlined"
								size="small"
								value={lastOrganization}
								onChange={(e) => setLastOrganization(e.target.value)}
								spellCheck={false}
							/>
						</Box>

						<Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
							<FormControl sx={{ flex: 1, minWidth: '250px', maxWidth: '400px' }} size="small">
								<InputLabel id="department">Department</InputLabel>
								<Select
									id="department-select"
									label="Department"
									value={department}
									onChange={(e) => setDepartment(e.target.value)}
								>
									<MenuItem value="TC">Technical</MenuItem>
									<MenuItem value="CS">Cyber Security</MenuItem>
									<MenuItem value="CM">Content Media</MenuItem>
									<MenuItem value="OT">Others</MenuItem>
								</Select>
							</FormControl>
						</Box>

						<Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
							<FormControl sx={{ flex: 1, minWidth: '250px', maxWidth: '400px' }} size="small">
								<InputLabel id="status-label">Current Status</InputLabel>
								<Select
									id="current-status-select"
									labelId="status-label"
									label="Current Status"
									value={currentStatus}
									onChange={(e) => setCurrentStatus(e.target.value)}
								>
									<MenuItem value="EM">Employed</MenuItem>
									<MenuItem value="UEM">Unemployed</MenuItem>
									<MenuItem value="FR">Freelancer</MenuItem>
									<MenuItem value="NP">Notice Period</MenuItem>
									<MenuItem value="SF">Student / Fresher </MenuItem>
								</Select>
							</FormControl>
						</Box>

						<div>

							<Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
								<FormControl component="fieldset">
									<Typography variant="subtitle1">Willing to Relocate?</Typography>
									<RadioGroup id="relocate-radio" row name="relocate" value={willingToRelocate} onChange={(e) => setWillingToRelocate(e.target.value)}>
										<FormControlLabel
											id="relocate-yes"
											value="Yes"
											control={<Radio />}
											label="Yes"
										/>
										<FormControlLabel
											id="relocate-no"
											value="No"
											control={<Radio />}
											label="No"
										/>
									</RadioGroup>
								</FormControl>
							</Box>

							{willingToRelocate === 'Yes' ?

								<div className='space-y-3'>
									<Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
										<FormControl component="fieldset">
											<Typography className='pb-1' variant="subtitle1">Do you have a passport?</Typography>
											<RadioGroup id="passport-radio" row name="passport" className='flex' value={passportAvailable} onChange={(e) => setPassportAvailable(e.target.value)}>
												<FormControlLabel
													id="passport-yes"
													value='true'
													control={<Radio />}
													label="Yes"
												/>
												<FormControlLabel
													id="passport-no"
													value='false'
													control={<Radio />}
													label="No"
												/>
											</RadioGroup>
										</FormControl>
									</Box>

									<Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
										<TextField
											id="expiry-input"
											sx={{ maxWidth: '200px' }}
											label="Expiry"
											type="number"
											variant="outlined"
											size="small"
											value={expiry}
											onChange={(e) => setExpiry(e.target.value)}
										>
										</TextField>
									</Box>
								</div> : ''
							}
						</div>

						<Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
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
								onClick={handleUploadResume}
							>
								Submit Form
							</Button>
						</Box>

					</Stack>
				</Paper>
			</Box>
		</form>
	);
};

export default Upload_form;