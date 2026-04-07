import { useAuth } from '@/lib/AuthContext';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/components/ui/use-toast';

export default function Settings() {
  const { user } = useAuth();
  const { toast } = useToast();

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await fetch('/api/auth/delete-account', { method: 'POST' });
        window.location.href = '/';
      } catch (error) {
        console.error('Error deleting account:', error);
      }
    }
  };

  return (
    <div className="min-h-screen pb-24">
      <div className="pt-24 px-6 py-8 max-w-2xl mx-auto">
        <div className="space-y-6">
          <div className="border-b border-border pb-6">
            <h2 className="text-xl font-semibold mb-4">Account</h2>
            <p className="text-sm text-muted-foreground mb-2">Email</p>
            <p className="text-base">{user?.email || 'Not logged in'}</p>
          </div>

          <div className="border-b border-border pb-6">
            <h2 className="text-xl font-semibold mb-4">Clock Appearance</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Clock Face Background</p>
                <div className="flex gap-3 items-center">
                  <Button 
                    variant="outline" 
                    onClick={() => document.getElementById('clock-face-upload').click()}
                  >
                    Choose Image
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      localStorage.removeItem('clockFaceUrl');
                      window.dispatchEvent(new Event('clock-face-updated'));
                      toast({ title: 'Clock face reset to default' });
                    }}
                  >
                    Reset
                  </Button>
                  <input 
                    id="clock-face-upload"
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        const img = new Image();
                        img.onload = () => {
                          const canvas = document.createElement('canvas');
                          const MAX_SIZE = 800;
                          let width = img.width;
                          let height = img.height;
                          
                          if (width > height && width > MAX_SIZE) {
                            height *= MAX_SIZE / width;
                            width = MAX_SIZE;
                          } else if (height > width && height > MAX_SIZE) {
                            width *= MAX_SIZE / height;
                            height = MAX_SIZE;
                          }
                          
                          canvas.width = width;
                          canvas.height = height;
                          const ctx = canvas.getContext('2d');
                          ctx.drawImage(img, 0, 0, width, height);
                          
                          const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
                          localStorage.setItem('clockFaceUrl', dataUrl);
                          window.dispatchEvent(new Event('clock-face-updated'));
                          toast({ title: 'Clock face updated!' });
                        };
                        img.src = event.target.result;
                      };
                      reader.readAsDataURL(file);
                    }} 
                  />
                </div>
              </div>
            </div>
          </div>



          <div className="border-b border-border pb-6">
            <h2 className="text-xl font-semibold mb-4">Danger Zone</h2>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete Account</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Account</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. Your account and all associated data will be permanently deleted.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex justify-end gap-3">
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteAccount} className="bg-destructive hover:bg-destructive/90">
                    Delete
                  </AlertDialogAction>
                </div>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
}