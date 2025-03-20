import React from 'react';
import TerminalConfigDisplay from '../components/TerminalConfigDisplay';
import { TerminalConfig } from '../types';
import { commonStyles, terminalTheme } from '../styles/theme';

interface TerminalPageProps {
  terminalConfig: TerminalConfig;
}

function TerminalPage({ terminalConfig }: TerminalPageProps) {
  return (
    <div>
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Terminal Configuration</h1>
          <p className="dashboard-subtitle">Manage your terminal settings across devices</p>
        </div>
      </div>

      <TerminalConfigDisplay config={terminalConfig} />

      <div style={{ marginTop: '1.5rem' }}>
        <button className="btn btn-primary">Edit Configuration</button>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3>Terminal Preview</h3>
        <div className="terminal-config" style={{ marginTop: '1rem', height: '300px', overflow: 'auto', backgroundColor: terminalTheme.background }}>
          {Array.from({ length: 15 }).map((_, index) => (
            <div key={index} className="config-line">
              <span className="line-number">{index + 1}</span>
              <span className="line-content">
                {index === 0 && <span><span style={{ color: terminalTheme.blue }}>user@machine</span>:<span style={{ color: terminalTheme.yellow }}>~</span>$ ls -la</span>}
                {index === 1 && <span>total 112</span>}
                {index === 2 && <span>drwxr-xr-x  24 user user  4096 Jun 10 14:23 <span style={{ color: terminalTheme.blue }}>.</span></span>}
                {index === 3 && <span>drwxr-xr-x   3 root root  4096 Apr 22 09:10 <span style={{ color: terminalTheme.blue }}>.</span></span>}
                {index === 4 && <span>-rw-------   1 user user 12345 Jun  9 22:15 .bash_history</span>}
                {index === 5 && <span>-rw-r--r--   1 user user   220 Apr 22 09:10 .bash_logout</span>}
                {index === 6 && <span>-rw-r--r--   1 user user  3771 Apr 22 09:10 .bashrc</span>}
                {index === 7 && <span>drwxr-xr-x  12 user user  4096 May 28 10:42 <span style={{ color: terminalTheme.blue }}>Documents</span></span>}
                {index === 8 && <span>drwxr-xr-x   4 user user  4096 Jun  2 18:30 <span style={{ color: terminalTheme.blue }}>Downloads</span></span>}
                {index === 9 && <span><span style={{ color: terminalTheme.blue }}>user@machine</span>:<span style={{ color: terminalTheme.yellow }}>~</span>$ cd Documents</span>}
                {index === 10 && <span><span style={{ color: terminalTheme.blue }}>user@machine</span>:<span style={{ color: terminalTheme.yellow }}>~/Documents</span>$ git status</span>}
                {index === 11 && <span>On branch <span style={{ color: terminalTheme.yellow }}>main</span></span>}
                {index === 12 && <span>Your branch is up to date with 'origin/main'.</span>}
                {index === 13 && <span>nothing to commit, working tree clean</span>}
                {index === 14 && <span><span style={{ color: terminalTheme.blue }}>user@machine</span>:<span style={{ color: terminalTheme.yellow }}>~/Documents</span>$ _</span>}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TerminalPage;