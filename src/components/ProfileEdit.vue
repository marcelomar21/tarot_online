<template>
  <div class="profile-edit">
    <h2 class="profile-edit-title">Editar Perfil</h2>
    <form @submit.prevent="updateProfile" class="profile-edit-form">
      <div class="form-group">
        <label for="name">Nome:</label>
        <input type="text" id="name" v-model="form.name" required>
      </div>
      <div class="form-group">
        <label for="birthday">Data de Nascimento:</label>
        <input type="date" id="birthday" v-model="form.birthday" required>
      </div>
      <div class="form-group">
        <label for="email">E-mail:</label>
        <input type="email" id="email" v-model="form.email" required>
      </div>
      <div class="form-actions">
        <button type="submit" class="btn-save">Salvar Alterações</button>
        <button type="button" @click="cancelEdit" class="btn-cancel">Cancelar</button>
      </div>
    </form>
    <p v-if="message" :class="{ 'success-message': isSuccess, 'error-message': !isSuccess }">
      {{ message }}
    </p>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import { authService } from '../services/authService';

export default {
  name: 'ProfileEdit',
  emits: ['close'],
  setup(props, { emit }) {
    const form = reactive({
      name: '',
      birthday: '',
      email: ''
    });

    const message = ref('');
    const isSuccess = ref(false);

    onMounted(() => {
      const user = authService.currentUser.value;
      if (user) {
        form.name = user.name;
        form.birthday = user.birthday;
        form.email = user.email;
      }
    });

    const updateProfile = async () => {
      try {
        await authService.updateUser(form);
        message.value = 'Perfil atualizado com sucesso!';
        isSuccess.value = true;
        setTimeout(() => emit('close'), 2000);
      } catch (error) {
        message.value = 'Erro ao atualizar o perfil. Tente novamente.';
        isSuccess.value = false;
      }
    };

    const cancelEdit = () => {
      emit('close');
    };

    return {
      form,
      updateProfile,
      cancelEdit,
      message,
      isSuccess
    };
  }
};
</script>

<style scoped>
.profile-edit {
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  max-width: 450px;
  margin: 20px auto;
  color: #fff;
}

.profile-edit-title {
  font-size: 2.2em;
  text-align: center;
  margin-bottom: 25px;
  color: #ffd700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.profile-edit-form {
  background-color: rgba(255, 255, 255, 0.1);
  padding: 25px;
  border-radius: 10px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 1.1em;
  color: #ffd700;
}

input {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  background-color: rgba(255, 255, 255, 0.2);
  color: #fff;
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  background-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

.btn-save, .btn-cancel {
  padding: 12px 25px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.3s ease;
  text-transform: uppercase;
}

.btn-save {
  background-color: #4CAF50;
  color: white;
  flex-grow: 1;
  margin-right: 10px;
}

.btn-save:hover {
  background-color: #45a049;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(76, 175, 80, 0.3);
}

.btn-cancel {
  background-color: #f44336;
  color: white;
  flex-grow: 1;
  margin-left: 10px;
}

.btn-cancel:hover {
  background-color: #d32f2f;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(244, 67, 54, 0.3);
}

.success-message, .error-message {
  text-align: center;
  padding: 10px;
  border-radius: 5px;
  margin-top: 20px;
  font-weight: bold;
}

.success-message {
  background-color: rgba(76, 175, 80, 0.2);
  color: #4CAF50;
}

.error-message {
  background-color: rgba(244, 67, 54, 0.2);
  color: #f44336;
}

@media (max-width: 768px) {
  .profile-edit {
    padding: 20px;
    margin: 10px;
  }

  .profile-edit-title {
    font-size: 1.8em;
  }

  .form-actions {
    flex-direction: column;
  }

  .btn-save, .btn-cancel {
    width: 100%;
    margin: 10px 0;
  }
}
</style>