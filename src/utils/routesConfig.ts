export enum ROUTES {
  HOME = '/',
  ME = '/me',
  FORMS_NEW = '/forms/new',
  FORMS_EDIT = '/forms/:formId/edit',
  FORM_PAGE = '/forms/:formId?',
  FORM_RESPONSES = '/forms/:formId/responses',
  FORM_RESPONSE = '/forms/:formId/responses/:responseId',
  LOGIN = '/login',
  SIGNUP = '/signup',
  RECOVERY_PASSWORD = '/recovery-password',
  NOT_FOUND = '*',
}
