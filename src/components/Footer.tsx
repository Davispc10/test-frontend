import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="text-sm text-center py-1">
      D. Feuser - {new Date().getFullYear()}
    </footer>
  )
}

export default Footer
