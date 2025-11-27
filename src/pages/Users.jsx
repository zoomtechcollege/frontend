import React, { useState } from 'react';
import axios from "axios"
// const BASE_URL = "http://localhost:3001/api/users"
const BASE_URL = "https://backend-cjba.onrender.com/api/users"
const Users = () => {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [editingUser, setEditingUser] = useState(null);
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		username: '',
		phone: '',
		password: ''
	});

	// פונקציה להצגת כל המשתמשים
	const fetchAllUsers = async () => {
		// TODO: חיבור לשרת
		// כאן יהיה קוד לשליחת בקשה GET לשרת
		// לדוגמה: const response = await axios.get('/api/users');
		// setUsers(response.data);
		const response = await axios.get(`${BASE_URL}/`)
		setUsers(response.data)
		console.log('Fetching all users from server...');
	};

	// פונקציה ליצירת משתמש חדש
	const createUser = async (userData) => {
		// TODO: חיבור לשרת
		// כאן יהיה קוד לשליחת בקשה POST לשרת
		// לדוגמה: const response = await axios.post('/api/users', userData);
		// setUsers([...users, response.data]);
		await axios.post(`${BASE_URL}/register`, formData)
		fetchAllUsers()
		console.log('Creating new user:', userData);
	};

	// פונקציה לעריכת משתמש קיים
	const updateUser = async (userId, userData) => {
		// TODO: חיבור לשרת
		// כאן יהיה קוד לשליחת בקשה PUT/PATCH לשרת
		// לדוגמה: const response = await axios.put(`/api/users/${userId}`, userData);
		// setUsers(users.map(user => user.id === userId ? response.data : user));
		await axios.patch(`${BASE_URL}/${userId}`, userData)
		fetchAllUsers()
		console.log('Updating user:', userId, userData);
	};

	// פונקציה למחיקת משתמש
	const deleteUser = async (userId) => {
		// TODO: חיבור לשרת
		// כאן יהיה קוד לשליחת בקשה DELETE לשרת
		// לדוגמה: await axios.delete(`/api/users/${userId}`);
		// setUsers(users.filter(user => user.id !== userId));
		await axios.delete(`${BASE_URL}/${userId}`)
		fetchAllUsers()
		console.log('Deleting user:', userId);
	};

	// טיפול בשינויי טופס
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	// טיפול בשליחת טופס
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		
		try {
			if (editingUser) {
				// עריכת משתמש קיים
				await updateUser(editingUser._id, formData);
				setEditingUser(null);
			} else {
				// יצירת משתמש חדש
				await createUser(formData);
			}
			// איפוס הטופס
			setFormData({
				name: '',
				email: '',
				username: '',
				phone: '',
				password: ''
			});
		} catch (err) {
			setError(err.message);
		}
	};

	// טיפול בלחיצה על כפתור עריכה
	const handleEdit = (user) => {
		setEditingUser(user);
		setFormData({
			name: user.name || '',
			email: user.email || '',
			username: user.username || '',
			phone: user.phone || '',
			password: user.password || '',
		});
	};

	// טיפול בביטול עריכה
	const handleCancelEdit = () => {
		setEditingUser(null);
		setFormData({
			name: '',
			email: '',
			username: '',
			phone: '',
			password: '',
		});
	};

	// טיפול במחיקת משתמש
	const handleDelete = async (userId) => {
		if (window.confirm('האם אתה בטוח שברצונך למחוק את המשתמש?')) {
			try {
				await deleteUser(userId);
			} catch (err) {
				setError(err.message);
			}
		}
	};

	return (
		<main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh' }}>
			<header style={{ marginBottom: '2rem' }}>
				<h1>ניהול משתמשים</h1>
			</header>

			{/* כפתור להצגת כל המשתמשים */}
			<section style={{ marginBottom: '2rem' }}>
				<button 
					onClick={fetchAllUsers}
					disabled={loading}
					className="btn-primary"
					aria-label={loading ? 'טוען משתמשים' : 'הצג את כל המשתמשים'}
				>
					{loading ? 'טוען...' : 'הצג את כל המשתמשים'}
				</button>
			</section>

			{/* הצגת שגיאה */}
			{error && (
				<div className="error-message" role="alert" aria-live="polite">
					<strong>שגיאה:</strong> {error}
				</div>
			)}

			{/* טופס ליצירה/עריכה */}
			<section className="card" style={{ marginBottom: '2rem' }}>
				<h2>{editingUser ? 'עריכת משתמש' : 'יצירת משתמש חדש'}</h2>
				<form onSubmit={handleSubmit} aria-label={editingUser ? 'טופס עריכת משתמש' : 'טופס יצירת משתמש חדש'}>
					<div style={{ marginBottom: '1rem' }}>
						<label htmlFor="name">
							שם:
						</label>
						<input
							id="name"
							type="text"
							name="name"
							value={formData.name}
							onChange={handleInputChange}
							required
							aria-required="true"
							aria-label="שם המשתמש"
						/>
					</div>

					<div style={{ marginBottom: '1rem' }}>
						<label htmlFor="email">
							אימייל:
						</label>
						<input
							id="email"
							type="email"
							name="email"
							value={formData.email}
							onChange={handleInputChange}
							required
							aria-required="true"
							aria-label="כתובת אימייל"
						/>
					</div>

					<div style={{ marginBottom: '1rem' }}>
						<label htmlFor="username">
							שם משתמש:
						</label>
						<input
							id="username"
							type="text"
							name="username"
							value={formData.username}
							onChange={handleInputChange}
							required
							aria-required="true"
							aria-label="שם משתמש"
						/>
					</div>

					<div style={{ marginBottom: '1rem' }}>
						<label htmlFor="phone">
							טלפון:
						</label>
						<input
							id="phone"
							type="tel"
							name="phone"
							value={formData.phone}
							onChange={handleInputChange}
							aria-label="מספר טלפון"
						/>
					</div>
					
					<div style={{ marginBottom: '1.5rem' }}>
						<label htmlFor="password">
							סיסמא:
						</label>
						<input
							id="password"
							type="password"
							name="password"
							value={formData.password}
							onChange={handleInputChange}
							aria-label="סיסמה"
						/>
					</div>

					<div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
						<button
							type="submit"
							className="btn-success"
							aria-label={editingUser ? 'עדכן משתמש' : 'צור משתמש חדש'}
						>
							{editingUser ? 'עדכן משתמש' : 'צור משתמש'}
						</button>
						{editingUser && (
							<button
								type="button"
								onClick={handleCancelEdit}
								className="btn-neutral"
								aria-label="ביטול עריכה"
							>
								ביטול
							</button>
						)}
					</div>
				</form>
			</section>

			{/* רשימת משתמשים */}
			<section>
				<h2>רשימת משתמשים</h2>
				{users.length === 0 ? (
					<div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
						<p style={{ fontSize: '1.125rem', color: 'var(--color-text-secondary)' }}>
							אין משתמשים להצגה. לחץ על "הצג את כל המשתמשים" כדי לטעון משתמשים מהשרת.
						</p>
					</div>
				) : (
					<div style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
						gap: '1.5rem'
					}}>
						{users.map((user) => (
							<article
								key={user._id}
								className="card"
							>
								<header>
									<h3>{user.name}</h3>
								</header>
								<dl style={{ margin: '1rem 0' }}>
									<div style={{ marginBottom: '0.75rem' }}>
										<dt style={{ 
											display: 'inline', 
											fontWeight: '600', 
											color: 'var(--color-text-primary)',
											marginLeft: '0.5rem'
										}}>
											אימייל:
										</dt>
										<dd style={{ 
											display: 'inline', 
											color: 'var(--color-text-secondary)',
											margin: 0
										}}>
											{user.email}
										</dd>
									</div>
									<div style={{ marginBottom: '0.75rem' }}>
										<dt style={{ 
											display: 'inline', 
											fontWeight: '600', 
											color: 'var(--color-text-primary)',
											marginLeft: '0.5rem'
										}}>
											שם משתמש:
										</dt>
										<dd style={{ 
											display: 'inline', 
											color: 'var(--color-text-secondary)',
											margin: 0
										}}>
											{user.username}
										</dd>
									</div>
									{user.phone && (
										<div style={{ marginBottom: '0.75rem' }}>
											<dt style={{ 
												display: 'inline', 
												fontWeight: '600', 
												color: 'var(--color-text-primary)',
												marginLeft: '0.5rem'
											}}>
												טלפון:
											</dt>
											<dd style={{ 
												display: 'inline', 
												color: 'var(--color-text-secondary)',
												margin: 0
											}}>
												{user.phone}
											</dd>
										</div>
									)}
								</dl>
								
								<footer style={{ marginTop: '1.25rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
									<button
										onClick={() => handleEdit(user)}
										className="btn-primary"
										aria-label={`ערוך את ${user.name}`}
									>
										עריכה
									</button>
									<button
										onClick={() => handleDelete(user._id)}
										className="btn-danger"
										aria-label={`מחק את ${user.name}`}
									>
										מחיקה
									</button>
								</footer>
							</article>
						))}
					</div>
				)}
			</section>
		</main>
	);
};

export default Users;

