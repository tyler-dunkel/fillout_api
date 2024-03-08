// env vars
export const PORT = process.env.PORT ?? '3000'
export const FILLOUT_API_KEY = process.env.FILLOUT_API_KEY

export const FILLOUT_API_PARAMS = ['limit', 'afterDate', 'beforeDate', 'offset', 'status', 'includeEditLink', 'sort']
export const ALLOWED_FILTER_CONDITIONS = ['equals', 'does_not_equal', 'less_than', 'greater_than']
export const FILLOUT_API_DOMAIN = 'https://api.fillout.com/v1/api/'