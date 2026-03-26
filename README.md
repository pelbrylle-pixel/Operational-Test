# Task Manager Web App

A full-stack task management application built with Django REST Framework (backend) and React (frontend).

## Project Structure

```
/
├── backend/           # Django REST Framework API
│   ├── manage.py
│   ├── requirements.txt
│   ├── db.sqlite3
│   ├── task_manager/  # Project settings
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── __init__.py
│   └── tasks/         # Tasks app
│       ├── models.py
│       ├── views.py
│       ├── serializers.py
│       ├── apps.py
│       └── migrations/
├── frontend/          # React application
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── App.jsx
│       ├── App.css
│       ├── TaskForm.jsx
│       ├── TaskForm.css
│       ├── TaskItem.jsx
│       ├── TaskItem.css
│       ├── api.js
│       ├── index.css
│       └── main.jsx
└── README.md
```

## Features

- ✅ View list of all tasks
- ✅ Create new tasks with title and optional description
- ✅ Edit existing tasks
- ✅ Mark tasks as completed/uncompleted
- ✅ Delete tasks
- ✅ Display task creation date and time
- ✅ Responsive design
- ✅ Loading states and error handling
- ✅ CORS enabled for development

## Technologies

### Backend
- Django 4.2.0
- Django REST Framework 3.14.0
- SQLite3 (database)
- django-cors-headers 4.0.0

### Frontend
- React 18.2.0
- Vite 4.3.0
- Axios 1.6.0
- Modern CSS with gradients and animations

## API Endpoints

### Tasks API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks/` | List all tasks |
| POST | `/api/tasks/` | Create a new task |
| GET | `/api/tasks/{id}/` | Retrieve a task by ID |
| PUT | `/api/tasks/{id}/` | Update a task (full update) |
| PATCH | `/api/tasks/{id}/` | Toggle task completion status |
| DELETE | `/api/tasks/{id}/` | Delete a task |

### Request/Response Examples

**Create Task (POST /api/tasks/)**
```json
Request:
{
  "title": "Buy groceries",
  "description": "Milk, eggs, and bread"
}

Response (201):
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Milk, eggs, and bread",
  "completed": false,
  "created_at": "2026-03-26T10:30:00Z"
}
```

**Toggle Completion (PATCH /api/tasks/1/)**
```json
Request:
{
  "completed": true
}

Response (200):
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Milk, eggs, and bread",
  "completed": true,
  "created_at": "2026-03-26T10:30:00Z"
}
```

## Setup Instructions

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. **Navigate to the backend folder:**
   ```bash
   cd backend
   ```

2. **Create a virtual environment (optional but recommended):**
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Apply migrations:**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Run the development server:**
   ```bash
   python manage.py runserver
   ```

   The backend will be available at `http://localhost:8000`

### Frontend Setup

1. **Open a new terminal and navigate to the frontend folder:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000`

## Usage

1. **Start the Django backend** (if not already running):
   ```bash
   cd backend
   python manage.py runserver
   ```

2. **In a separate terminal, start the React frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

4. **Use the application**:
   - Type a task title and optional description
   - Click "Create Task" to add a new task
   - Check the checkbox to mark tasks as completed/uncompleted
   - Click "Edit" to modify a task
   - Click "Delete" to remove a task

## Task Model Fields

| Field | Type | Description |
|-------|------|-------------|
| id | AutoField | Primary key (auto-generated) |
| title | CharField(255) | Task title (required) |
| description | TextField | Task description (optional) |
| completed | BooleanField | Completion status (default: False) |
| created_at | DateTimeField | Creation timestamp (auto-set) |

## API Implementation Details

The backend uses Django REST Framework's `ViewSet` class (not `ModelViewSet`) for custom control over each endpoint:

- **list()**: Returns all tasks
- **create()**: Creates a new task
- **retrieve()**: Returns a specific task by ID
- **update()**: Full update of a task (PUT)
- **partial_update()**: Partial update, used for toggling completion status (PATCH)
- **destroy()**: Deletes a task

## Troubleshooting

### Backend Issues

**"No module named 'django'" error:**
```bash
pip install -r requirements.txt
```

**Database errors:**
```bash
python manage.py migrate
python manage.py makemigrations tasks
```

### Frontend Issues

**"Cannot find module 'axios'" or other dependencies:**
```bash
npm install
```

**Port 3000 already in use:**
Edit `frontend/vite.config.js` and change the port number.

### CORS Issues

If you encounter CORS errors:
- Ensure the backend is running on `http://localhost:8000`
- Ensure the frontend is running on `http://localhost:3000`
- Check that `django-cors-headers` is installed and configured

## Development Notes

- The backend uses SQLite for simplicity. For production, consider PostgreSQL or MySQL.
- The frontend uses Vite for fast development and build tooling.
- CORS is enabled for localhost development.
- All API responses are JSON formatted.
- Error handling is implemented on both frontend and backend.

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- Add user authentication and authorization
- Add filtering and sorting capabilities
- Add task categories/tags
- Add due dates and reminders
- Add task priorities
- Deploy to production (Heroku, Vercel, AWS, etc.)

## Notes & Assumptions

- This is a development setup optimized for learning and rapid development.
- The SQLite database is stored in the backend folder and is not tracked by git.
- CORS is configured for localhost only; update for production deployment.
- The API uses standard REST conventions with proper HTTP status codes.
- Timestamps are stored in UTC timezone.
- Task descriptions support plain text; HTML/Markdown support can be added if needed.

---

**Project Started**: March 26, 2026
**Time Allotment**: 3 hours
- Backend: 1 hour
- Frontend: 1 hour
- Integration & Testing: 1 hour
