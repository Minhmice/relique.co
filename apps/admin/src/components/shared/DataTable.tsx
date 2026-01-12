"use client";

import React from 'react';
import { Edit, Trash2, Eye } from 'lucide-react';

interface Column {
  header: string | React.ReactNode;
  accessor: string;
  render?: (row: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
}

const DataTable: React.FC<DataTableProps> = ({ columns, data, onEdit, onDelete, onView }) => {
  return (
    <div className="w-full overflow-x-auto bg-surface border border-border rounded-xl shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead className="bg-white/5 border-b border-border">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                {col.header}
              </th>
            ))}
            {(onEdit || onDelete || onView) && (
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (onEdit || onDelete || onView ? 1 : 0)} className="px-6 py-12 text-center text-gray-500 italic">
                No records found.
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={row.id} className="hover:bg-white/5 transition-colors group">
                {columns.map((col, idx) => (
                  <td key={idx} className="px-6 py-4 text-sm font-medium text-white">
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
                {(onEdit || onDelete || onView) && (
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      {onView && (
                        <button 
                          onClick={() => onView(row.id)}
                          className="p-2 text-gray-400 hover:text-accent hover:bg-accent/10 rounded-lg transition-all"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      )}
                      {onEdit && (
                        <button 
                          onClick={() => onEdit(row.id)}
                          className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                          title="Edit Item"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      )}
                      {onDelete && (
                        <button 
                          onClick={() => onDelete(row.id)}
                          className="p-2 text-gray-400 hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all"
                          title="Delete Item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;

