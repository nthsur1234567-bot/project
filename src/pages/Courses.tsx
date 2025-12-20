import React, { useEffect, useMemo, useState } from "react"; // comment: react + hooks
import PageLayout from "../components/PageLayout"; // comment: shared layout
import { COURSES_KEY } from "../constants/storageKeys"; // comment: storage key
import type { Course } from "../models/course"; // comment: course type
import { // comment: MUI imports
  Box, // comment: layout container
  Button, // comment: buttons
  Dialog, // comment: popup dialog
  DialogActions, // comment: dialog buttons area
  DialogContent, // comment: dialog content area
  DialogTitle, // comment: dialog title
  IconButton, // comment: icon button
  Paper, // comment: paper surface
  Stack, // comment: flex stack
  Table, // comment: table
  TableBody, // comment: table body
  TableCell, // comment: table cell
  TableContainer, // comment: table container
  TableHead, // comment: table header
  TableRow, // comment: table row
  TextField, // comment: inputs
  Typography, // comment: text
} from "@mui/material"; // comment: end MUI imports
import EditIcon from "@mui/icons-material/Edit"; // comment: edit icon
import AddIcon from "@mui/icons-material/Add"; // comment: add icon

type CourseFormState = { // comment: form state type (string inputs)
  code: string; // comment: course code input
  name: string; // comment: course name input
  credits: string; // comment: credits as string for TextField
  teacherName: string; // comment: teacher name input
}; // comment: end form type

type CourseFormErrors = Partial<Record<keyof CourseFormState, string>>; // comment: field errors type

const createEmptyForm = (): CourseFormState => ({ // comment: create empty form state
  code: "", // comment: empty code
  name: "", // comment: empty name
  credits: "", // comment: empty credits
  teacherName: "", // comment: empty teacher name
}); // comment: end empty form

const loadCourses = (): Course[] => { // comment: load courses from localStorage
  try { // comment: start try
    const raw = localStorage.getItem(COURSES_KEY); // comment: read storage
    if (!raw) return []; // comment: no data
    const parsed = JSON.parse(raw); // comment: parse json
    if (!Array.isArray(parsed)) return []; // comment: validate array
    return parsed as Course[]; // comment: return typed
  } catch { // comment: parse failed
    return []; // comment: fallback
  } // comment: end try/catch
}; // comment: end load

const saveCourses = (courses: Course[]): void => { // comment: save courses to localStorage
  localStorage.setItem(COURSES_KEY, JSON.stringify(courses)); // comment: store JSON
}; // comment: end save

const generateId = (): string => { // comment: safe id generator
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) { // comment: check randomUUID
    return crypto.randomUUID(); // comment: generate uuid
  } // comment: end if
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`; // comment: fallback id
}; // comment: end generator

const validateCourseForm = (form: CourseFormState, existing: Course[], editingId: string | null): CourseFormErrors => { // comment: validate form
  const errors: CourseFormErrors = {}; // comment: init errors

  if (!form.code.trim()) errors.code = "Course code is required"; // comment: required code
  else if (!/^[A-Za-z]{2,5}\d{2,4}$/.test(form.code.trim())) errors.code = "Use format like CS101"; // comment: code format

  if (!form.name.trim()) errors.name = "Course name is required"; // comment: required name
  else if (form.name.trim().length > 60) errors.name = "Max 60 characters"; // comment: length check

  const creditsNum = Number(form.credits); // comment: parse credits
  if (!form.credits.trim()) errors.credits = "Credits is required"; // comment: required credits
  else if (!Number.isFinite(creditsNum) || creditsNum < 0 || creditsNum > 30) errors.credits = "Credits must be 0-30"; // comment: range check

  if (!form.teacherName.trim()) errors.teacherName = "Teacher name is required"; // comment: required teacher

  const normalizedCode = form.code.trim().toUpperCase(); // comment: normalize code
  const codeExists = existing.some((c) => c.code.toUpperCase() === normalizedCode && c.id !== editingId); // comment: check duplicates
  if (normalizedCode && codeExists) errors.code = "Course code already exists"; // comment: duplicate code

  return errors; // comment: return errors
}; // comment: end validate

const toFormState = (course: Course): CourseFormState => ({ // comment: convert course -> form
  code: course.code, // comment: map code
  name: course.name, // comment: map name
  credits: String(course.credits), // comment: map credits to string
  teacherName: course.teacherName, // comment: map teacher
}); // comment: end converter

const Courses: React.FC = () => { // comment: courses page component
  const [courses, setCourses] = useState<Course[]>(() => loadCourses()); // comment: courses state
  const [search, setSearch] = useState<string>(""); // comment: search query state

  const [dialogOpen, setDialogOpen] = useState<boolean>(false); // comment: dialog open state
  const [editingId, setEditingId] = useState<string | null>(null); // comment: null=add, string=edit
  const [form, setForm] = useState<CourseFormState>(() => createEmptyForm()); // comment: form state
  const [errors, setErrors] = useState<CourseFormErrors>({}); // comment: errors state

  useEffect(() => { // comment: persist to localStorage on changes
    saveCourses(courses); // comment: save state to storage
  }, [courses]); // comment: dependency

  const filteredCourses = useMemo(() => { // comment: compute filtered list
    const q = search.trim().toLowerCase(); // comment: normalized query
    if (!q) return courses; // comment: no search -> all
    return courses.filter((c) => { // comment: filter by code or name
      const code = c.code.toLowerCase(); // comment: normalized code
      const name = c.name.toLowerCase(); // comment: normalized name
      return code.includes(q) || name.includes(q); // comment: match condition
    }); // comment: end filter
  }, [courses, search]); // comment: dependencies

  const openAddDialog = (): void => { // comment: open dialog for adding
    setEditingId(null); // comment: no editing
    setForm(createEmptyForm()); // comment: reset form
    setErrors({}); // comment: clear errors
    setDialogOpen(true); // comment: open dialog
  }; // comment: end open add

  const openEditDialog = (course: Course): void => { // comment: open dialog for editing
    setEditingId(course.id); // comment: set editing id
    setForm(toFormState(course)); // comment: fill form
    setErrors({}); // comment: clear errors
    setDialogOpen(true); // comment: open dialog
  }; // comment: end open edit

  const closeDialog = (): void => { // comment: close dialog
    setDialogOpen(false); // comment: close
  }; // comment: end close

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>): void => { // comment: update form fields
    const { name, value } = e.target; // comment: extract name/value
    setForm((prev) => ({ ...prev, [name]: value })); // comment: update field
    setErrors((prev) => ({ ...prev, [name]: "" })); // comment: clear field error
  }; // comment: end change

  const handleSave = (): void => { // comment: save handler for add/edit
    const newErrors = validateCourseForm(form, courses, editingId); // comment: validate
    setErrors(newErrors); // comment: set errors
    if (Object.keys(newErrors).length > 0) return; // comment: stop if invalid

    const creditsNum = Number(form.credits); // comment: parse credits
    const normalizedCode = form.code.trim().toUpperCase(); // comment: normalize code

    if (editingId === null) { // comment: add new course
      const newCourse: Course = { // comment: build new course object
        id: generateId(), // comment: generate id
        code: normalizedCode, // comment: set normalized code
        name: form.name.trim(), // comment: set name
        credits: creditsNum, // comment: set credits number
        teacherName: form.teacherName.trim(), // comment: set teacher name
        createdAt: Date.now(), // comment: set timestamp
      }; // comment: end new course
      setCourses((prev) => [newCourse, ...prev]); // comment: add to list
      closeDialog(); // comment: close dialog
      return; // comment: exit
    } // comment: end add

    setCourses((prev) => // comment: edit existing
      prev.map((c) => { // comment: map through courses
        if (c.id !== editingId) return c; // comment: unchanged
        return { // comment: updated course
          ...c, // comment: keep other fields
          code: normalizedCode, // comment: update code
          name: form.name.trim(), // comment: update name
          credits: creditsNum, // comment: update credits
          teacherName: form.teacherName.trim(), // comment: update teacher
        }; // comment: end updated object
      }) // comment: end map
    ); // comment: end setCourses
    closeDialog(); // comment: close dialog after edit
  }; // comment: end save handler

  return ( // comment: render page
    <PageLayout title="Course Management"> {/* comment: layout wrapper */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 2 }}> {/* comment: top controls */}
        <TextField
          label="Search by name or code" // comment: search label
          value={search} // comment: controlled value
          onChange={(e) => setSearch(e.target.value)} // comment: update search
          fullWidth // comment: responsive full width
        />

        <Button variant="contained" startIcon={<AddIcon />} onClick={openAddDialog}> {/* comment: add button */}
          Add Course
        </Button>
      </Stack>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}> {/* comment: hint text */}
        Total courses: {courses.length} {/* comment: show total */}
      </Typography>

      <TableContainer component={Paper}> {/* comment: table container */}
        <Table> {/* comment: table */}
          <TableHead> {/* comment: header */}
            <TableRow> {/* comment: header row */}
              <TableCell>Code</TableCell> {/* comment: code column */}
              <TableCell>Name</TableCell> {/* comment: name column */}
              <TableCell>Credits</TableCell> {/* comment: credits column */}
              <TableCell>Teacher</TableCell> {/* comment: teacher column */}
              <TableCell align="right">Actions</TableCell> {/* comment: actions column */}
            </TableRow>
          </TableHead>

          <TableBody> {/* comment: body */}
            {filteredCourses.length === 0 ? ( // comment: empty state
              <TableRow> {/* comment: empty row */}
                <TableCell colSpan={5} align="center"> {/* comment: empty cell */}
                  No courses found. {/* comment: empty text */}
                </TableCell>
              </TableRow>
            ) : (
              filteredCourses.map((course) => ( // comment: map rows
                <TableRow key={course.id}> {/* comment: row */}
                  <TableCell>{course.code}</TableCell> {/* comment: code */}
                  <TableCell>{course.name}</TableCell> {/* comment: name */}
                  <TableCell>{course.credits}</TableCell> {/* comment: credits */}
                  <TableCell>{course.teacherName}</TableCell> {/* comment: teacher */}
                  <TableCell align="right"> {/* comment: actions */}
                    <IconButton onClick={() => openEditDialog(course)} aria-label="edit course"> {/* comment: edit button */}
                      <EditIcon /> {/* comment: edit icon */}
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={closeDialog} fullWidth maxWidth="sm"> {/* comment: add/edit dialog */}
        <DialogTitle> {/* comment: title */}
          {editingId === null ? "Add Course" : "Edit Course"} {/* comment: dynamic title */}
        </DialogTitle>

        <DialogContent> {/* comment: dialog content */}
          <Box sx={{ pt: 1 }}> {/* comment: spacing */}
            <Stack spacing={2}> {/* comment: vertical fields */}
              <TextField
                name="code" // comment: field name
                label="Course Code (e.g., CS101)" // comment: label
                value={form.code} // comment: controlled value
                onChange={handleFormChange} // comment: change handler
                error={Boolean(errors.code)} // comment: error flag
                helperText={errors.code || "Format: letters + digits"} // comment: helper
                fullWidth // comment: full width
              />

              <TextField
                name="name" // comment: field name
                label="Course Name" // comment: label
                value={form.name} // comment: controlled value
                onChange={handleFormChange} // comment: change handler
                error={Boolean(errors.name)} // comment: error flag
                helperText={errors.name || "Up to 60 characters"} // comment: helper
                fullWidth // comment: full width
              />

              <TextField
                name="credits" // comment: field name
                label="Credits" // comment: label
                value={form.credits} // comment: controlled value
                onChange={handleFormChange} // comment: change handler
                error={Boolean(errors.credits)} // comment: error flag
                helperText={errors.credits || "0-30"} // comment: helper
                fullWidth // comment: full width
              />

              <TextField
                name="teacherName" // comment: field name
                label="Teacher Name" // comment: label
                value={form.teacherName} // comment: controlled value
                onChange={handleFormChange} // comment: change handler
                error={Boolean(errors.teacherName)} // comment: error flag
                helperText={errors.teacherName || "Enter teacher name"} // comment: helper
                fullWidth // comment: full width
              />
            </Stack>
          </Box>
        </DialogContent>

        <DialogActions> {/* comment: dialog buttons */}
          <Button onClick={closeDialog}>Cancel</Button> {/* comment: cancel */}
          <Button variant="contained" onClick={handleSave}>Save</Button> {/* comment: save */}
        </DialogActions>
      </Dialog>
    </PageLayout>
  ); // comment: end render
}; // comment: end component

export default Courses; // comment: export page
