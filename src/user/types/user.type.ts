import { UserEntity } from '../user.entity';

// Omit - удаляет ненужное поле из типа
export type UserType = Omit<UserEntity, 'hashPassword'>;
