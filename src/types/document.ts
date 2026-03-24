export type DocType = 'doc' | 'table' | 'file'

export interface DocumentItem {
  id: string
  name: string
  type: DocType
  lastViewed: string
}
