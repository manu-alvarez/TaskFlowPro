import React, { useState } from 'react';
import { Box, Typography, Grid, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { motion } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import { useTaskStore } from '../store/taskStore';

const DEFAULT_CATEGORY_IDS = new Set(['all', 'edelweiss_care', 'work']);

const Categories: React.FC = () => {
  const { categories, tasks, addCategory, deleteCategory } = useTaskStore();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [color, setColor] = useState('#00F5FF');
  const duplicate = categories.some(category => category.name.toLocaleLowerCase('es') === name.trim().toLocaleLowerCase('es'));
  const canAdd = name.trim().length > 0 && !duplicate;

  const createCategory = () => {
    if (!canAdd) return;
    addCategory(name, color);
    setName('');
    setColor('#00F5FF');
    setOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, alignItems: 'center', mb: 4 }}>
        <Typography variant="h3" color="secondary" sx={{ fontWeight: 800 }}>Categorías</Typography>
        <Button variant="contained" startIcon={<Plus />} onClick={() => setOpen(true)}>Nueva categoría</Button>
      </Box>
      <Grid container spacing={3}>
        {categories.map((category, index) => {
          const catTasks = category.id === 'all' ? tasks : tasks.filter(task => task.categoryId === category.id);
          const completed = catTasks.filter(task => task.status === 'completed').length;
          const isCustom = !DEFAULT_CATEGORY_IDS.has(category.id);
          return (
            <Grid item xs={12} sm={6} md={4} key={category.id}>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}>
                <Paper sx={{
                  p: 3, borderTop: `4px solid ${category.color}`,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2
                }}>
                  <Typography variant="h2">{category.icon}</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>{category.name}</Typography>
                  <Box sx={{ display: 'flex', gap: 4, textAlign: 'center' }}>
                    <Box>
                      <Typography variant="h6" color="primary">{catTasks.length}</Typography>
                      <Typography variant="caption" color="text.secondary">Total</Typography>
                    </Box>
                    <Box>
                      <Typography variant="h6" color="success.main">{completed}</Typography>
                      <Typography variant="caption" color="text.secondary">Hechas</Typography>
                    </Box>
                  </Box>
                  {isCustom && (
                    <Button color="error" size="small" startIcon={<Trash2 size={16} />}
                      disabled={catTasks.length > 0}
                      title={catTasks.length > 0 ? 'Mueve o elimina las tareas antes de borrar la categoría' : 'Eliminar categoría vacía'}
                      onClick={() => {
                        if (window.confirm(`¿Eliminar la categoría «${category.name}»?`)) deleteCategory(category.id);
                      }}>
                      Eliminar
                    </Button>
                  )}
                </Paper>
              </motion.div>
            </Grid>
          );
        })}
      </Grid>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Nueva categoría</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 2 }}>
          <TextField autoFocus fullWidth label="Nombre" value={name} onChange={event => setName(event.target.value)}
            inputProps={{ maxLength: 40 }} error={duplicate && name.trim().length > 0}
            helperText={duplicate ? 'Ya existe una categoría con ese nombre' : 'Máximo 40 caracteres'} />
          <TextField fullWidth type="color" label="Color" value={color}
            onChange={event => setColor(event.target.value)} InputLabelProps={{ shrink: true }} />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button variant="contained" disabled={!canAdd} onClick={createCategory}>Crear categoría</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Categories;
