import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { useTaskStore } from '../store/taskStore';
import { Settings2 } from 'lucide-react';

const Categories: React.FC = () => {
  const { categories, tasks } = useTaskStore();

  return (
    <Box sx={{ flexGrow: 1, position: 'relative' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h3" color="secondary" sx={{ fontWeight: 800 }}>Categorías</Typography>
      </Box>

      <Grid container spacing={3}>
        {categories.map((category, index) => {
          const catTasks = tasks.filter(t => t.categoryId === category.id);
          const completed = catTasks.filter(t => t.status === 'completed').length;
          const total = catTasks.length;

          return (
            <Grid item xs={12} sm={6} md={4} key={category.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <Paper 
                  sx={{ 
                    p: 4, 
                    borderTop: `4px solid ${category.color}`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <Box sx={{ 
                    position: 'absolute', 
                    top: -20, 
                    right: -20, 
                    width: 100, 
                    height: 100, 
                    borderRadius: '50%', 
                    background: `radial-gradient(circle, ${category.color}30 0%, rgba(0,0,0,0) 70%)`,
                  }} />

                  <Typography variant="h2">{category.icon}</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>{category.name}</Typography>
                  
                  <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" color="primary">{total}</Typography>
                      <Typography variant="caption" color="text.secondary">Total</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" color="success.main">{completed}</Typography>
                      <Typography variant="caption" color="text.secondary">Hechas</Typography>
                    </Box>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          );
        })}

        <Grid item xs={12} sm={6} md={4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: categories.length * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            style={{ height: '100%' }}
          >
            <Paper 
              sx={{ 
                p: 4, 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                border: '1px dashed rgba(255,255,255,0.2)',
                backgroundColor: 'rgba(255,255,255,0.02)',
                cursor: 'pointer'
              }}
              onClick={() => alert('Edición de categorías próximamente')}
            >
              <Settings2 size={40} color="rgba(255,255,255,0.5)" />
              <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 600 }}>
                Gestionar
              </Typography>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Categories;
