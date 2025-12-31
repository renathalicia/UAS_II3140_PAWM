import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0B3C5D',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },

  // Profile Header
  profileHeader: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 24,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  userName: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userInstitute: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  nimBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  nimText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // Date & Time
  dateTimeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dateBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 6,
  },
  dateText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  timeBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 6,
  },
  timeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // Calendar
  calendarCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    paddingBottom: 16,
    marginBottom: 20,
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0f172a',
    marginBottom: 16,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  calendarNavBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarMonthYear: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  calendarWeekDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  weekDayText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748b',
    width: 36,
    textAlign: 'center',
  },
  calendarDays: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarDay: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  calendarDayEmpty: {
    opacity: 0,
  },
  calendarDayToday: {
    backgroundColor: '#0B3C5D',
    borderRadius: 20,
  },
  calendarDaySelected: {
    backgroundColor: '#CDE6F5',
    borderRadius: 20,
  },
  calendarDayText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },
  calendarDayTextToday: {
    color: '#FFFFFF',
    fontWeight: '900',
  },
  calendarDayTextSelected: {
    color: '#0B3C5D',
    fontWeight: '900',
  },

  // To Do List
  todoSection: {
    marginBottom: 20,
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  todoInputCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  todoInput: {
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    color: '#0f172a',
    marginBottom: 8,
  },
  deadlineInputBtn: {
    marginBottom: 12,
  },
  deadlineInput: {
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
  },
  deadlineInputText: {
    fontSize: 14,
    color: '#0f172a',
  },
  deadlineInputPlaceholder: {
    color: '#94a3b8',
  },
  addBtn: {
    backgroundColor: '#0B3C5D',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  addBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // Todo Items
  todoItem: {
    backgroundColor: '#0d4f6e',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  todoItemDragging: {
    opacity: 0.8,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  dragHandle: {
    padding: 4,
    marginRight: 4,
  },
  checkbox: {
    padding: 4,
    marginRight: 8,
  },
  todoContent: {
    flex: 1,
    marginLeft: 4,
  },
  todoText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  todoTextChecked: {
    textDecorationLine: 'line-through',
    color: 'rgba(255, 255, 255, 0.5)',
  },
  reorderButtons: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 8,
  },
  todoDeadline: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  deleteBtn: {
    padding: 4,
    marginLeft: 8,
  },

  emptyTodo: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyTodoText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 12,
  },
});