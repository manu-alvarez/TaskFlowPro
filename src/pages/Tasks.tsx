import React, { useState } from 'react';
import { Box, Typography, Paper, IconButton, Chip, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTaskStore } from '../store/taskStore';
import { Plus, Trash2, CheckCircle, Circle } from 'lucide-react';

const Tasks: React.FC = () => {
  const { tasks, addTask, deleteTask, updateTask, categories } = useTaskStore();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || '');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const handleCreate = () => {
    if (title.trim()) {
      addTask({ title, description: '', categoryId, priority, status: 'pending' });
      setTitle('');
      setOpen(false);
    }
  };

  const getPriorityColor = (p: string) => {
    if (p === 'low') return 'success';
    if (p === 'medium') return 'warning';
    return 'error';
  };

  return (
    <Box sx={{ flexGrow: 1, position: 'relative' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h3" color="primary" sx={{ fontWeight: 800 }}>Mis Tareas</Typography>
        <Button variant="contained" color="primary" startIcon={<Plus />} onClick={() => setOpen(true)} sx={{ borderRadius: 100 }}>
          Nueva Tarea
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <AnimatePresence>
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              layout
            >
              <Paper 
                sx={{ 
                  p: 3, 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 3, 
                  borderLeft: `4px solid`,
                  borderLeftColor: `${getPriorityColor(task.priority)}.main`,
                  opacity: task.status === 'completed' ? 0.6 : 1
                }}
              >
                <IconButton 
                  color={task.status === 'completed' ? 'primary' : 'default'}
                  onClick={() => updateTask(task.id, { status: task.status === 'completed' ? 'pending' : 'completed' })}
                >
                  {task.status === 'completed' ? <CheckCircle /> : <Circle />}
                </IconButton>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ textDecoration: task.status === 'completed' ? 'line-through' : 'none' }}>
                    {task.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {categories.find(c => c.id === task.categoryId)?.name || 'Sin Categoría'}
                  </Typography>
                </Box>
                <Chip size="small" label={task.priority} color={getPriorityColor(task.priority) as any} />
                <IconButton color="error" onClick={() => deleteTask(task.id)}>
                  <Trash2 size={20} />
                </IconButton>
              </Paper>
            </motion.div>
          ))}
          {tasks.length === 0 && (
            <Typography color="text.secondary" align="center" sx={{ mt: 5 }}>
              No hay tareas registradas. ¡Disfruta tu día!
            </Typography>
          )}
        </AnimatePresence>
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} PaperProps={{ sx: { borderRadius: 4, width: '100%', maxWidth: 500, bgcolor: 'background.paper' } }}>
        <DialogTitle sx={{ fontWeight: 800 }}>Nueva Tarea</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
          <TextField 
            autoFocus 
            fullWidth 
            label="¿Qué necesitas hacer?" 
            variant="outlined" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
          <TextField 
            select 
            fullWidth 
            label="Categoría" 
            value={categoryId} 
            onChange={(e) => setCategoryId(e.target.value)}
          >
            {categories.map((c) => (
              <MenuItem key={c.id} value={c.id}>{c.icon} {c.name}</MenuItem>
            ))}
          </TextField>
          <TextField 
            select 
            fullWidth 
            label="Prioridad" 
            value={priority} 
            onChange={(e) => setPriority(e.target.value as any)}
          >
            <MenuItem value="low">🟢 Baja</MenuItem>
            <MenuItem value="medium">🟡 Media</MenuItem>
            <MenuItem value="high">🔴 Alta</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={() => setOpen(false)} color="inherit">Cancelar</Button>
          <Button onClick={handleCreate} variant="contained" color="primary">Guardar Tarea</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Tasks;
