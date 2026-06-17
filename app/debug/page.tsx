'use client';

import { useState, useEffect } from 'react';

interface TableInfo {
  exists: boolean;
  error?: string;
  count: number;
  records: any[];
}

interface DebugData {
  success: boolean;
  tables?: {
    teachers: TableInfo;
    students: TableInfo;
  };
  error?: string;
}

export default function DebugPage() {
  const [debugData, setDebugData] = useState<DebugData | null>(null);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [seedMessage, setSeedMessage] = useState('');

  useEffect(() => {
    checkTables();
  }, []);

  const checkTables = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/debug/tables');
      const data = await response.json();
      setDebugData(data);
    } catch (error) {
      setDebugData({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch table data',
      });
    } finally {
      setLoading(false);
    }
  };

  const seedTestData = async () => {
    try {
      setSeeding(true);
      setSeedMessage('');
      const response = await fetch('/api/debug/seed', { method: 'POST' });
      const data = await response.json();
      setSeedMessage(JSON.stringify(data, null, 2));
      await checkTables();
    } catch (error) {
      setSeedMessage(`Error: ${error instanceof Error ? error.message : 'Failed to seed'}`);
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Authentication Debug Dashboard</h1>

        <div className="bg-slate-800 rounded-lg p-6 mb-6 border border-slate-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-white">Database Status</h2>
            <button
              onClick={checkTables}
              disabled={loading}
              className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 disabled:opacity-50"
            >
              {loading ? 'Checking...' : 'Refresh'}
            </button>
          </div>

          {loading ? (
            <p className="text-slate-300">Checking database tables...</p>
          ) : debugData?.success ? (
            <div className="space-y-4">
              {/* Teachers Table */}
              <div className="bg-slate-700 p-4 rounded-lg border-l-4 border-blue-500">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold text-white">Teachers Table</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    debugData.tables?.teachers.exists ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                  }`}>
                    {debugData.tables?.teachers.exists ? 'EXISTS' : 'NOT FOUND'}
                  </span>
                </div>
                {debugData.tables?.teachers.error ? (
                  <p className="text-red-400 text-sm mb-2">{debugData.tables.teachers.error}</p>
                ) : (
                  <p className="text-slate-300 text-sm mb-3">Records: {debugData.tables?.teachers.count || 0}</p>
                )}
                {debugData.tables?.teachers.records.length ? (
                  <div className="bg-slate-800 p-3 rounded text-xs text-slate-200 overflow-auto max-h-40">
                    <pre>{JSON.stringify(debugData.tables.teachers.records, null, 2)}</pre>
                  </div>
                ) : (
                  <p className="text-yellow-400 text-sm">No records found. Click "Seed Test Data" below.</p>
                )}
              </div>

              {/* Students Table */}
              <div className="bg-slate-700 p-4 rounded-lg border-l-4 border-purple-500">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold text-white">Students Table</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    debugData.tables?.students.exists ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                  }`}>
                    {debugData.tables?.students.exists ? 'EXISTS' : 'NOT FOUND'}
                  </span>
                </div>
                {debugData.tables?.students.error ? (
                  <p className="text-red-400 text-sm mb-2">{debugData.tables.students.error}</p>
                ) : (
                  <p className="text-slate-300 text-sm mb-3">Records: {debugData.tables?.students.count || 0}</p>
                )}
                {debugData.tables?.students.records.length ? (
                  <div className="bg-slate-800 p-3 rounded text-xs text-slate-200 overflow-auto max-h-40">
                    <pre>{JSON.stringify(debugData.tables.students.records, null, 2)}</pre>
                  </div>
                ) : (
                  <p className="text-yellow-400 text-sm">No records found. Click "Seed Test Data" below.</p>
                )}
              </div>
            </div>
          ) : (
            <p className="text-red-400">{debugData?.error}</p>
          )}
        </div>

        <div className="bg-slate-800 rounded-lg p-6 mb-6 border border-slate-700">
          <h2 className="text-2xl font-semibold text-white mb-4">Actions</h2>
          <button
            onClick={seedTestData}
            disabled={seeding}
            className="w-full px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 font-semibold"
          >
            {seeding ? 'Seeding...' : 'Seed Test Data'}
          </button>
          {seedMessage && (
            <div className="mt-4 bg-slate-700 p-4 rounded text-xs text-slate-200 overflow-auto max-h-40">
              <pre>{seedMessage}</pre>
            </div>
          )}
        </div>

        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h2 className="text-2xl font-semibold text-white mb-4">Test Credentials</h2>
          <p className="text-slate-300 mb-4">After seeding, use these credentials to test authentication:</p>
          
          <div className="space-y-3">
            <div className="bg-slate-700 p-3 rounded">
              <p className="font-semibold text-white mb-1">Teacher Login:</p>
              <p className="text-slate-300 text-sm">Name: <code className="bg-slate-600 px-2 py-1 rounded">Ahmed Ali</code></p>
              <p className="text-slate-300 text-sm">Password: <code className="bg-slate-600 px-2 py-1 rounded">teacher123</code></p>
            </div>

            <div className="bg-slate-700 p-3 rounded">
              <p className="font-semibold text-white mb-1">Student Login:</p>
              <p className="text-slate-300 text-sm">Name: <code className="bg-slate-600 px-2 py-1 rounded">Mohammed Ahmed</code></p>
              <p className="text-slate-300 text-sm">Password: <code className="bg-slate-600 px-2 py-1 rounded">student123</code></p>
            </div>
          </div>

          <a
            href="/"
            className="inline-block mt-6 px-6 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600"
          >
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}
