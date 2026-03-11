import React from 'react';
import { Box, Typography, Grid, Paper, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Flame, CheckCircle2, Clock, Plus, Target } from 'lucide-react';

const stats = [
  { id: 1, title: 'Tareas Hoy', value: '12', icon: <Target size={24} />, color: '#00F5FF' },
  { id: 2, title: 'Completadas', value: '8', icon: <CheckCircle2 size={24} />, color: '#00FF66' },
  { id: 3, title: 'En Progreso', value: '3', icon: <Flame size={24} />, color: '#FF00E4' },
  { id: 4, title: 'Atrasadas', value: '1', icon: <Clock size={24} />, color: '#FF3366' },
];

const MotionPaper = motion(Paper);

const Dashboard: React.FC = () => {  
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
              Buen día, <Box component="span" sx={{ color: 'primary.main' }}>Edelweiss</Box> ✨
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Tienes 4 tareas urgentes para hoy. ¡A por ellas!
            </Typography>
          </motion.div>
        </Box>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<Plus />}
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
          {/* Mock Task List */}
          {[1,2,3].map((task, i) => (
             <MotionPaper
              key={task}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 + (i * 0.1) }}
              sx={{ p: 2, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
             >
               <Typography>Ejemplo de Tarea {task}</Typography>
             </MotionPaper>
          ))}
        </Grid>
        <Grid item xs={12} lg={4}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>Atajos UI</Typography>
          <MotionPaper
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            sx={{ p: 3, textAlign: 'center' }}
           >
            <Typography variant="body2" color="text.secondary">Widgets Próximamente</Typography>
          </MotionPaper>
        </Grid>
      </Grid>

    </Box>
  );
};

export default Dashboard;
