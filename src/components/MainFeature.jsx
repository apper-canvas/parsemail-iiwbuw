import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Check as CheckIcon,
  Code as CodeIcon,
  Command as CommandIcon,
  Plus as PlusIcon,
  Trash as TrashIcon,
  Save as SaveIcon,
  Mail as EmailIcon,
  Send as SendIcon
} from 'lucide-react';

export default function MainFeature() {
  const [variables, setVariables] = useState([
    { id: 1, name: 'orderNumber', type: 'number', value: '', selectionStart: 0, selectionEnd: 0 },
    { id: 2, name: 'trackingId', type: 'string', value: '', selectionStart: 0, selectionEnd: 0 },
  ]);
  const [nextId, setNextId] = useState(3);
  const [currentVariableId, setCurrentVariableId] = useState(null);
  const [emailContent, setEmailContent] = useState(`From: shipping@example.com
To: you@parsemail.app
Subject: Shipping Confirmation

Dear Valued Customer,

Tracking: USPS1234567890
Amount: $89.95

Expected delivery: 3-5 business days`);
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const [webhookUrl, setWebhookUrl] = useState('https://webhook.site/your-unique-url');
  const [isWebhookConfigured, setIsWebhookConfigured] = useState(false);


  const [selectedText, setSelectedText] = useState('');
  const emailContentRef = useRef(null);
  const handleTextSelect = () => {
    if (emailContentRef.current) {
      const textarea = emailContentRef.current;
      const selStart = textarea.selectionStart;
      const selEnd = textarea.selectionEnd;
      if (selStart !== selEnd) {
        const selected = textarea.value.substring(selStart, selEnd);
        setSelectedText(selected);
        setSelection({ start: selStart, end: selEnd });
      }
      else {
        setSelectedText('');
      }
    }
  };

  const handleApplySelection = (id) => {
    if (selectedText) {
      setVariables(
        variables.map(variable =>
          variable.id === id ? { ...variable, value: selectedText, selectionStart: selection.start, selectionEnd: selection.end } : variable
        )
      );
      setCurrentVariableId(null);
    } else {
      toast.error("Please select text from the email content first");
    }
  };

  const addVariable = () => {
    const newVariable = {
      id: nextId,
      name: `variable${nextId}`,
      type: 'string',
      value: '',
      selectionStart: 0,
      selectionEnd: 0
    };
    setVariables([...variables, newVariable]);
    setNextId(nextId + 1);
  };

  const removeVariable = (id) => {
    setVariables(variables.filter(variable => variable.id !== id));
  };

  const updateVariableName = (id, name) => {
    setVariables(
      variables.map(variable =>
        variable.id === id ? { ...variable, name } : variable
      )
    );
  };

  const updateVariableType = (id, type) => {
    setVariables(
      variables.map(variable =>
        variable.id === id ? { ...variable, type } : variable
      )
    );
  };

  const handleSubmitWebhook = () => {
    if (!webhookUrl.trim()) {
      toast.error("Please enter a webhook URL");
      return;
    }

    if (!variables.some(v => v.value)) {
      toast.error("Please set at least one variable value by selecting text");
      return;
    }

    setIsWebhookConfigured(true);
    toast.success("Webhook configured successfully!");
  };

  const handleSaveRules = () => {
    const emptyVariables = variables.filter(v => !v.value);
    if (emptyVariables.length > 0) {
      toast.error(`Some variables don't have values: ${emptyVariables.map(v => v.name).join(', ')}`);
      return;
    }
    toast.success("Parsing rules saved successfully!");
  };

  const getHighlightedContent = () => {
    let content = emailContent;
    let offset = 0;

    // Sort variables by selectionStart to handle overlapping highlights properly
    const sortedVariables = [...variables]
      .filter(v => v.value)
      .sort((a, b) => a.selectionStart - b.selectionStart);

    for (const variable of sortedVariables) {
      const { selectionStart, selectionEnd, name } = variable;

      // Adjust for previous insertions
      const adjustedStart = selectionStart + offset;
      const adjustedEnd = selectionEnd + offset;

      const beforeSelection = content.substring(0, adjustedStart);
      const selection = content.substring(adjustedStart, adjustedEnd);
      const afterSelection = content.substring(adjustedEnd);

      const highlightedSelection = `<mark class="bg-primary/20 dark:bg-primary/30 rounded px-1" title="${name}">${selection}</mark>`;

      content = beforeSelection + highlightedSelection + afterSelection;

      // Update offset for next variable
      offset += highlightedSelection.length - selection.length;
    }

    return content;
  };

  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-4 text-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          Define <span className="text-primary">Parsing Rules</span> Visually
        </h2>
        <p className="text-lg text-surface-600 dark:text-surface-300 max-w-2xl mx-auto">
          Select text in the email to define what data you want to extract and where to send it.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="card-compact shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <EmailIcon className="text-primary" size={22} /> 
              <h3 className="text-xl font-bold">Email Content</h3>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  setEmailContent(`From: shipping@example.com
To: you@parsemail.app
Subject: Shipping Confirmation

Dear Valued Customer,

Your package has been shipped!

Order: #A78945
Tracking: USPS1234567890
Amount: $89.95

Expected delivery: 3-5 business days
`); 
                 }}
                className="text-xs px-2 py-1 rounded bg-surface-200 dark:bg-surface-700 hover:bg-surface-300 dark:hover:bg-surface-600"
              >
                Load Example
              </button>
            </div>

          
          </div>
          <div className="text-sm text-surface-500 dark:text-surface-400 mb-2"> 
            Select text in the email to extract data
          </div>
          <div className="relative">
            <textarea
              ref={emailContentRef}
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              onMouseUp={handleTextSelect}
              onKeyUp={handleTextSelect}
              className="w-full h-[350px] font-mono text-sm p-3 border border-surface-200 dark:border-surface-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none bg-white dark:bg-surface-900 transition-all-sm"
            />
            {selectedText && (
              <div className="absolute bottom-4 right-4 bg-white dark:bg-surface-800 p-2 rounded-lg shadow-lg border border-surface-200 dark:border-surface-700">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs bg-primary/10 dark:bg-primary/20 text-primary px-2 py-1 rounded">Selected:</span>
                  <span className="font-mono text-sm truncate max-w-[150px]">{selectedText}</span>
                </div>
                <div className="flex gap-2">
                  {currentVariableId ? (
                    <button
                      onClick={() => handleApplySelection(currentVariableId)}
                    >
                      <CheckIcon size={14} /> Apply
                      <CheckIcon size={14} /> Apply
                    </button>
                  ) : (
                    <div className="text-xs text-surface-500">
                      Click "Select" on a variable
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex flex-col gap-8"
        >
          <div className="card-neu">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CodeIcon className="text-secondary" size={22} />
                <h3 className="text-xl font-bold">Parsing Variables</h3>
              </div>
              <button
                onClick={addVariable}
                className="p-1.5 rounded-full bg-primary/10 dark:bg-primary/20 hover:bg-primary/20 dark:hover:bg-primary/30 text-primary transition-all-sm"
              >
                <PlusIcon size={18} />
              </button>
            </div>

            <div className="space-y-4 max-h-[280px] overflow-y-auto pr-2 scrollbar-hide"> 
              {variables.map((variable) => (
                <div 
                  key={variable.id}
                  className="border border-surface-200 dark:border-surface-700 rounded-lg p-2 bg-white dark:bg-surface-800 transition-all-sm"
                >
                  <div className="flex flex-wrap gap-3 mb-2">
                    <div className="flex-1 min-w-[120px]">
                      <label htmlFor={`name-${variable.id}`} className="text-xs text-surface-500 mb-1 block">
                        Variable Name
                      </label>
                      <input
                        id={`name-${variable.id}`}
                        type="text"
                        value={variable.name}
                        onChange={(e) => updateVariableName(variable.id, e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-surface-200 dark:border-surface-700 rounded focus:ring-1 focus:ring-primary focus:border-transparent bg-white dark:bg-surface-900 transition-all-sm"
                      />
                    </div>

                    <div className="w-[120px]"> 
                      <label htmlFor={`type-${variable.id}`} className="text-xs text-surface-500 mb-1 block">
                        Type
                      </label>
                      <select
                        id={`type-${variable.id}`}
                        value={variable.type}
                        onChange={(e) => updateVariableType(variable.id, e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-surface-200 dark:border-surface-700 rounded focus:ring-1 focus:ring-primary focus:border-transparent bg-white dark:bg-surface-900 transition-all-sm"
                      >
                        <option value="string">Text</option>
                        <option value="number">Number</option>
                        <option value="currency">Currency</option>
                        <option value="date">Date</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3"> 
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentVariableId(variable.id)}
                        className={`px-2 py-1 text-xs rounded transition-all-sm ${currentVariableId === variable.id 
                          ? 'bg-primary text-white' 
                          : 'bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600'}`}
                      >
                        Select
                      </button>

                      {variable.value && (
                        <div className="text-xs px-1.5 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full font-medium">
                          Set
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => removeVariable(variable.id)}
                      className="p-1 text-surface-500 hover:text-red-500"
                    >
                      <TrashIcon size={16} />
                    </button>
                  </div>

                  {variable.value && (
                    <div className="mt-1.5 text-xs bg-surface-100 dark:bg-surface-700 p-1.5 rounded font-mono">
                      {variable.value} 
                    </div>
                  )}
                </div>
              ))}

            
            <div className="mt-4 pt-4 border-t border-surface-200 dark:border-surface-700">
              <button
                onClick={handleSaveRules}
                className="w-full btn-secondary flex items-center justify-center gap-2 transition-all-sm"
              >
                <SaveIcon size={18} /> Save Parsing Rules
              </button>
            </div>

          </div>
          <div className="card-neu"> 
            <div className="flex items-center gap-2 mb-3">
              <SendIcon className="text-accent" size={22} />
              <h3 className="text-xl font-bold">Webhook Configuration</h3>

            </div>
            
            <div className="mb-4">
              <label htmlFor="webhook-url" className="text-sm text-surface-500 mb-1 block">
                Webhook URL
              </label>
              <input
                id="webhook-url"
                type="url"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://webhook.site/your-unique-url"
                className="w-full px-3 py-2 border border-surface-200 dark:border-surface-700 rounded focus:ring-1 focus:ring-primary focus:border-transparent bg-white dark:bg-surface-900 transition-all-sm"
                disabled={isWebhookConfigured}
              />
            </div>

            {isWebhookConfigured ? (
              <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-lg flex items-center gap-2">
                <CheckIcon size={18} />
                <span>Webhook configured successfully!</span>
              </div>
            ) : (
              <button
                onClick={handleSubmitWebhook} 
                className="w-full btn-accent flex items-center justify-center gap-2 transition-all-sm"
              >
                <CommandIcon size={18} /> Configure Webhook 
            )}
              </button> 
            <div>
            
            {isWebhookConfigured && (
              <div className="mt-4 text-sm text-surface-600 dark:text-surface-300">
                <p>Your parsed data will be sent to the configured webhook whenever a new email is received.</p>
                <div className="mt-2 p-3 bg-surface-100 dark:bg-surface-700 rounded-lg">
                  <pre className="text-xs overflow-auto">
{`{
  "timestamp": "${new Date().toISOString()}",
  "email": {
    "from": "orders@example.com",
    "subject": "Your Order #12345 has shipped!"
  ${variables.map(v => `"${v.name}": "${v.value || '(not set)'}"`).join(',\n  ')} 
${variables.map(v => `    "${v.name}": "${v.value || '(not set)'}"`).join(',\n')} 
}`}
}`}
                  </pre>
                </div>
              </div>
            </div>
            )}
          </div>
        </motion.div>

      {variables.some(v => v.value) && (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="mt-8 card"
        >
          <h3 className="text-xl font-bold mb-4">
            Email Preview with Highlighted Variables
          />
        </motion.div>
      )}
    </div>
  );
}