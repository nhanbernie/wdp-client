'use client'

import React from 'react'
import { Grid3x3, List } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

interface Props {
  viewMode: 'grid' | 'list'
  onChangeViewMode: (mode: 'grid' | 'list') => void
}

export const ViewModeToggle: React.FC<Props> = ({ viewMode, onChangeViewMode }) => {
  const { colors } = useTheme()

  return (
    <div
      className="flex rounded-lg overflow-hidden"
      style={{ border: `1px solid ${colors.border}` }}
    >
      <button
        onClick={() => onChangeViewMode('grid')}
        className="p-2 transition-colors"
        style={{
          backgroundColor: viewMode === 'grid' ? colors.accent : colors.cardBackground,
          color: viewMode === 'grid' ? 'white' : colors.textSecondary,
        }}
      >
        <Grid3x3 size={20} />
      </button>
      <button
        onClick={() => onChangeViewMode('list')}
        className="p-2 transition-colors"
        style={{
          backgroundColor: viewMode === 'list' ? colors.accent : colors.cardBackground,
          color: viewMode === 'list' ? 'white' : colors.textSecondary,
        }}
      >
        <List size={20} />
      </button>
    </div>
  )
}
