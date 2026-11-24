import React from 'react';
import { Box, Typography, Grid, Paper, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Flame, CheckCircle2, Clock, Plus, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTaskStore } from '../store/taskStore';

const MotionPaper = motion(Paper);

const Dashboard: React.FC = () => {
  const tasks = useTaskStore(state => state.tasks);
  const navigate = useNavigate();
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const dueToday = tasks.filter(t => t.status !== 'completed' && t.dueDate?.slice(0, 10) === todayKey).length;
  const overdue = tasks.filter(t => t.status !== 'completed' && t.dueDate && t.dueDate.slice(0, 10) < todayKey).length;
  const completed = tasks.filter(t => t.status === 'completed').length;
  const inProgress = tasks.filter(t => t.status === 'in_progress').length;
  const urgent = tasks.filter(t => t.status !== 'completed' && t.priority === 'high').length;
  const upcoming = tasks.filter(t => t.status !== 'completed')
    .sort((a, b) => (a.dueDate || '9999').localeCompare(b.dueDate || '9999') || a.order - b.order)
    .slice(0, 5);
  const stats = [
    { id: 1, title: 'Para hoy', value: dueToday, icon: <Target size={24} />, color: '#00F5FF' },
    { id: 2, title: 'Completadas', value: completed, icon: <CheckCircle2 size={24} />, color: '#00FF66' },
    { id: 3, title: 'En progreso', value: inProgress, icon: <Flame size={24} />, color: '#FF00E4' },
    { id: 4, title: 'Atrasadas', value: overdue, icon: <Clock size={24} />, color: '#FF3366' },
  ];
  return (
    <Box sx={{ flexGrow: 1, position: 'relative' }}>
      {/* Background Ambient Glow */}
      <Box
        sx={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          background: 'radial-gradient(circle, rgba(0,245,255,0.15) 0%, rgba(0,0,0,0) 70%)',
          borderRadius: '50%',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: 100,
          left: -100,
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(255,0,228,0.1) 0%, rgba(0,0,0,0) 70%)',
          borderRadius: '50%',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <Box sx={{ position: 'relative', zIndex: 1, mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Typography variant="h3" color="text.primary" sx={{ mb: 1 }}>
              Resumen de <Box component="span" sx={{ color: 'primary.main' }}>tus tareas</Box>
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {urgent > 0 ? `Tienes ${urgent} tareas de prioridad alta pendientes.` : 'No tienes tareas de prioridad alta pendientes.'}
            </Typography>
          </motion.div>
        </Box>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<Plus />}
            onClick={() => navigate('/tasks?new=1')}
            sx={{ px: 4, py: 1.5, fontSize: '1rem' }}
          >
            Nueva Tarea
          </Button>
        </motion.div>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4, position: 'relative', zIndex: 1 }}>
        {stats.map((stat, i) => (
          <Grid item xs={6} md={3} key={stat.id}>
            <MotionPaper
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              sx={{
                p: 3,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: `0 8px 30px ${stat.color}25`,
                  borderColor: `${stat.color}50`
                }
              }}
            >
              <Box 
                sx={{ 
                  p: 1.5, 
                  borderRadius: 3, 
                  bgcolor: `${stat.color}15`, 
                  color: stat.color,
                  display: 'flex'
                }}
              >
                {stat.icon}
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>{stat.value}</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
                  {stat.title}
                </Typography>
              </Box>
            </MotionPaper>
          </Grid>
        ))}
      </Grid>

      {/* Main Content Area */}
      <Grid container spacing={3} sx={{ position: 'relative', zIndex: 1 }}>
        <Grid item xs={12} lg={8}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>Próximas Tareas</Typography>
          {upcoming.length === 0 ? (
            <Typography color="text.secondary">No hay tareas pendientes. Crea una desde Tareas.</Typography>
          ) : upcoming.map((task, i) => (
            <MotionPaper key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.15 + i * 0.07 }}
              sx={{ p: 2, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
              <Typography>{task.title}</Typography>
              <Typography variant="caption" color="text.secondary">
                {task.dueDate ? task.dueDate.slice(0, 10).split('-').reverse().join('/') : 'Sin vencimiento'}
              </Typography>
            </MotionPaper>
          ))}
        </Grid>
        <Grid item xs={12} lg={4}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>Acciones</Typography>
          <MotionPaper
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            sx={{ p: 3, textAlign: 'center' }}
           >
            <Button variant="outlined" fullWidth onClick={() => navigate('/tasks')}>Gestionar tareas</Button>
          </MotionPaper>
        </Grid>
      </Grid>

    </Box>
  );
};

export default Dashboard;
