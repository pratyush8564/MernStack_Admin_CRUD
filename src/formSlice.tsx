import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define interfaces
interface FormData {
  fullName?: string; // optional for login
  email: string;
  password: string;
}

interface UserDetails {
  fullName: string;
  email: string;
}

interface TicketData {
  requestBy: string;
  subject: string;
  assignee: File | null; // Assignee is a file
  priority: string;
  status: string;
  createDate: string;
  dueDate: string;
}

interface Ticket {
  _id: string;
  requestBy: string;
  subject: string;
  assignee: string; // Assuming assignee is a URL or identifier
  priority: string;
  status: string;
  createDate: string;
  dueDate: string;
}

interface FormState {
  formData: FormData;
  ticketData: TicketData;
  tickets: Ticket[]; // Add tickets array here
  success: string | null;
  error: string | null;
  loading: boolean;
  userDetails: UserDetails | null;
}

const initialState: FormState = {
  formData: {
    email: '',
    password: '',
  },
  ticketData: {
    requestBy: '',
    subject: '',
    assignee: null,
    priority: '',
    status: '',
    createDate: '',
    dueDate: '',
  },
  tickets: [], // Initialize as empty array
  success: null,
  error: null,
  loading: false,
  userDetails: null,
};

// Define async thunk for registration
export const registerUser = createAsyncThunk(
  'form/registerUser',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Define async thunk for login
export const loginUser = createAsyncThunk(
  'form/loginUser',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      // Save token and email to local storage
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', formData.email); // Save email for user details request

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Define async thunk for fetching user details
export const getUserDetails = createAsyncThunk(
  'form/getUserDetails',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const email = localStorage.getItem('email'); // Retrieve email from local storage

      if (!token || !email) {
        throw new Error('No token or email found');
      }

      const response = await fetch(`http://localhost:3000/api/userDetails?email=${email}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Define async thunk for ticket creation
export const createTicket = createAsyncThunk(
  'form/createTicket',
  async (ticketData: TicketData, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append('requestBy', ticketData.requestBy);
    formData.append('subject', ticketData.subject);
    formData.append('priority', ticketData.priority);
    formData.append('status', ticketData.status);
    formData.append('createDate', ticketData.createDate);
    formData.append('dueDate', ticketData.dueDate);
    if (ticketData.assignee) {
      formData.append('assigneeImage', ticketData.assignee);
    }

    try {
      const response = await fetch('http://localhost:3000/api/tickets', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Define async thunk for fetching tickets
export const fetchTickets = createAsyncThunk(
  'form/fetchTickets',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3000/api/tickets');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      return result.data; // Access `data` from API response
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData(state, action) {
      state.formData = action.payload;
    },
    resetForm(state) {
      state.formData = initialState.formData;
    },
    setTicketData(state, action) {
      state.ticketData = action.payload;
    },
    resetTicketData(state) {
      state.ticketData = initialState.ticketData;
    },
  },
  extraReducers: (builder) => {
    builder
      // Registration cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = 'Registration successful!';
        state.formData = initialState.formData;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = 'User logged in successfully';
        state.formData = initialState.formData;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // User details cases
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = action.payload;
        state.success = 'User details fetched successfully';
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Ticket creation cases
      .addCase(createTicket.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.success = 'Ticket created successfully!';
        state.ticketData = initialState.ticketData;
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Tickets fetching cases
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload;
        state.success = 'Tickets fetched successfully';
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFormData, resetForm, setTicketData, resetTicketData } = formSlice.actions;
export default formSlice.reducer;
