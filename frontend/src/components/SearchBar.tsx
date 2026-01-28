interface SearchBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  department: string;
  onDepartmentChange: (value: string) => void;
  departments: string[];
}

export default function SearchBar({
  search,
  onSearchChange,
  department,
  onDepartmentChange,
  departments,
}: SearchBarProps) {
  return (
    <div style={{
      display: 'flex',
      gap: '1rem',
      marginBottom: '2rem',
      flexWrap: 'wrap'
    }}>
      <input
        type="text"
        placeholder="Search courses..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{ flex: '1', minWidth: '200px' }}
      />
      
      <select
        value={department}
        onChange={(e) => onDepartmentChange(e.target.value)}
        style={{ minWidth: '200px' }}
      >
        <option value="">All Departments</option>
        {departments.map(dept => (
          <option key={dept} value={dept}>{dept}</option>
        ))}
      </select>
    </div>
  );
}
